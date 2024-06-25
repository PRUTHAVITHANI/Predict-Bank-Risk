import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from './OAuth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';
import { FaUnlockKeyhole } from "react-icons/fa6";
import { AiTwotoneMail } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
    if (validator.isStrongPassword(e.target.value)) {
      setPasswordError('Strong Password');
    } else {
      setPasswordError(
        'Passwords must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers, and symbols*'
      );
    }
  };

  const validateEmail = (e) => {
    setEmail(e.target.value);
    if (validator.isEmail(e.target.value)) {
      setEmailError('Valid Email');
    } else {
      setEmailError('Invalid Email*');
    }
  };

  const validateUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length < 6) {
      setUsernameError('Username must have at least 6 characters');
    } else {
      setUsernameError('Valid username');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        toast('Something went wrong, please try again', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      setLoading(false);
      setError(null);
      toast('Register successfully', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='bg-white h-screen flex justify-center items-center'>
      <div className="py-2 justify-center">
        <div className="relative py-2 sm:max-w-md sm:mx-auto">
        <div className="relative mt-16 mb-6 px-2 py-5 bg-slate-400 shadow-gray-700 shadow-lg rounded-xl sm:p-12">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-gray-800 text-2xl font-bold max-w-xs w-64 text-center">
                  Register Your Account
                </h1>
              </div>
              <div className='divide-y divide-gray-200'>
                <div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                  <div className='relative'>
                    <span
                      className={
                        usernameError === 'Valid username'
                          ? 'text-success text-green-500 text-sm'
                          : 'text-danger text-red-500 text-sm'
                      }
                    >
                      {usernameError}
                    </span>
                    <div className='relative'>
                      <input
                        type='text'
                        className="p-3 rounded-lg border w-full text-gray-700 border-black focus:border-black focus:outline-none"
                        placeholder='Username'
                        id='username'
                        value={username}
                        onChange={(e) => {
                          validateUsername(e);
                          handleChange(e);
                        }}
                      />
                      <FaUserAlt className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-gray-900 cursor-pointer" />
                    </div>
                  </div>
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
                    <div className='relative'>
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
                      <AiTwotoneMail className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-gray-900 cursor-pointer" />
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
                    <div className='relative'>
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
                      <FaUnlockKeyhole className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-gray-900 cursor-pointer" />
                    </div>
                  </div>
                  <div className='relative text-center'>
                    <button
                      type='submit'
                      onClick={handleSignup}
                      disabled={
                        loading ||
                        !username ||
                        !email ||
                        !password ||
                        usernameError !== 'Valid username' ||
                        emailError !== 'Valid Email' ||
                        passwordError !== 'Strong Password'
                      }
                      className="border-2 bg-black text-white hover:bg-white hover:text-black hover:border-black p-3 mb-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-90 font-bold py-2 px-4 w-[100%]"
                    >
                      {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    <div className="relative text-center flex items-center mt-3 mb-4">
                      <div className="border w-[200px] h-0 mr-2 my-2 border-black"></div>
                      <div className='text-black text-xl'>or</div>
                      <div className="border w-[200px] h-0 mr-2 my-2 border-black"></div>
                    </div>
                    <OAuth />
                    <div className='flex gap-2 mt-5 text-black'>
                      <p>Have an account?</p>
                      <Link to={'/'}>
                        <span className='text-gray-900'>Sign in</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
