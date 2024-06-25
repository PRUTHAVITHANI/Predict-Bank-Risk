import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from './OAuth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';
import { AiTwotoneMail } from "react-icons/ai";
import { FaUserLock } from "react-icons/fa";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);

    if (validator.isStrongPassword(e.target.value)) {
      setPasswordError("Strong Password");
    } else {
      setPasswordError(
        "Passwords must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers, and symbols*"
      );
    }
  };

  const validateEmail = (e) => {
    setEmail(e.target.value);
    if (validator.isEmail(e.target.value)) {
      setEmailError("Valid Email");
    } else {
      setEmailError("Invalid Email*");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
        toast(data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      toast("Login successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(signInSuccess(data));
      navigate('/home');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='bg-white h-screen flex justify-center items-center'>
      <div className="py-2 justify-center sm:py-8">
        <div className="relative py-2 sm:max-w-md sm:mx-auto">
          <div className="relative mt-16 mb-6 px-2 py-5 bg-slate-400  shadow-gray-700 shadow-lg rounded-xl sm:p-12">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-gray-900 text-2xl font-bold max-w-xs w-64 text-center">
                  Login to your account
                </h1>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className='relative'>
                    <span
                      className={
                        emailError === 'Valid Email'
                          ? 'text-success text-green-500 text-sm'
                          : 'text-danger text-red-500 text-sm'
                      }
                    >
                      {emailError}
                    </span>
                    <div className="relative">
                      <input
                        type='text'
                        placeholder='Email'
                        className="p-3 rounded-lg border w-full text-gray-700 border-black focus:border-black focus:outline-none"
                        id='email'
                        value={email}
                        onChange={(e) => {
                          validateEmail(e);
                          handleChange(e);
                        }}
                      />
                      <AiTwotoneMail className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-black cursor-pointer" />
                    </div>
                  </div>
                  <div className='relative'>
                    <span
                      className={
                        passwordError === 'Strong Password'
                          ? 'text-success text-green-500 text-sm'
                          : 'text-danger text-red-500 text-sm'
                      }
                    >
                      {passwordError}
                    </span>
                    <div className="relative">
                      <input
                        type='password'
                        placeholder='Password'
                        className="p-3 rounded-lg border w-full text-gray-700 border-black focus:border-black focus:outline-none"
                        id='password'
                        value={password}
                        onChange={(e) => {
                          validatePassword(e);
                          handleChange(e);
                        }}
                      />
                      <FaUserLock className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-black cursor-pointer" />
                    </div>
                  </div>
                  <div className="relative text-center">
                    <button onClick={handleLogin}
                      disabled={loading || emailError !== 'Valid Email' || passwordError !== 'Strong Password'}
                      className="border-2 bg-black text-white hover:bg-white hover:text-black hover:border-black p-3 mb-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-90 font-bold py-2 px-4 w-[100%]">
                      {loading ? 'Loading...' : 'Login'}
                    </button>
                  </div>

                  <div className="relative text-center flex items-center">
                    <div className="border w-[200px] h-0 mr-2 my-2 border-black"></div>
                    <div className='text-black text-xl'>or</div>
                    <div className="border w-[200px] h-0 mr-2 my-2 border-black"></div>
                  </div>

                  <OAuth />

                  <div className='flex gap-2 mt-5 text-black'>
                    <p>Don't Have an account?</p>
                    <Link to={"/sign-up"}>
                      <span className='text-gray-900'>Sign up</span>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;
