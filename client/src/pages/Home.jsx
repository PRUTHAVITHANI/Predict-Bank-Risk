import React, { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {SignOutUserFailure,SignOutUserStart,SignOutUserSuccess} from '../redux/user/userSlice';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  FaSignOutAlt} from 'react-icons/fa';



const Home = () => {
  const [formData, setFormData] = useState({
    laufkont: '',
    laufzeit: '',
    moral: '',
    verw: '',
    hoehe: '',
    sparkont: '',
    beszeit: '',
    rate: '',
    famges: '',
    buerge: '',
    wohnzeit: '',
    verm: '',
    alter: '',
    weitkred: '',
    wohn: '',
    bishkred: '',
    beruf: '',
    pers: '',
    telef: '',
    gastarb: '',
  });

  const [prediction, setPrediction] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => response.json())
      .then((data) => setPrediction(`Credit Risk Prediction: ${data.prediction}`))
      .catch(() => setPrediction('Error during prediction'));
  };

  const handleSignOut = async ()=>{
    try {
      dispatch(SignOutUserStart());
     const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success == false){
       dispatch(SignOutUserFailure(data.message));
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
      dispatch(SignOutUserSuccess(data));
      toast("Signout successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/')
    } catch (error) {
      dispatch(SignOutUserFailure (data.message));
    }
  };

  return  (
   
        <div className="bg-gray-100 flex items-center justify-center py-10 relative" style={{ width: '100%', height: '100%' }}>
          <div className="max-w-7xl w-full bg-slate-400 shadow-gray-700 shadow-lg  p-8 rounded-lg  relative z-10">
            <header className="flex justify-end">
              <button onClick={handleSignOut} className="py-1 px-3 bg-[#872341] text-xl text-white font-semibold rounded-md shadow-sm">
                Logout
                <FaSignOutAlt className='inline-block mr-1 ml-4 mb-1 h-8 w-8 text-xl text-white' />
              </button>
            </header>
    
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Credit Risk Prediction</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className='mr-16 ml-8'>
                <label htmlFor="laufkont" className="block text-sm font-medium text-gray-700">Status of Checking Account</label>
                <select id="laufkont" name="laufkont" value={formData.laufkont} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">No checking account</option>
                  <option value="2">Balance &lt; 0 DM</option>
                  <option value="3">Balance 0 to 200 DM</option>
                  <option value="4">Balance &gt;= 200 DM or salary deposited for at least one year</option>
                </select>
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="laufzeit" className="block text-sm font-medium text-gray-700">Credit Duration (Months)</label>
                <input type="number" id="laufzeit" name="laufzeit" value={formData.laufzeit} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" min="0" />
              </div>
    
              <div className="mr-16 ml-8">
                <label htmlFor="moral" className="block text-sm font-medium text-gray-700">Credit History</label>
                <select id="moral" name="moral" value={formData.moral} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="0">Delay in paying off in the past</option>
                  <option value="1">Critical account/other credits elsewhere</option>
                  <option value="2">No credits taken or all credits paid back duly</option>
                  <option value="3">Existing credits paid back duly till now</option>
                  <option value="4">All credits at this bank paid back duly</option>
                </select>
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="verw" className="block text-sm font-medium text-gray-700">Purpose of Credit</label>
                <select id="verw" name="verw" value={formData.verw} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="0">Others</option>
                  <option value="1">Car (new)</option>
                  <option value="2">Car (used)</option>
                  <option value="3">Furniture/equipment</option>
                  <option value="4">Radio/television</option>
                  <option value="5">Domestic appliances</option>
                  <option value="6">Repairs</option>
                  <option value="7">Education</option>
                  <option value="8">Vacation</option>
                  <option value="9">Retraining</option>
                  <option value="10">Business</option>
                </select>
              </div>
    
              <div className="mr-16 ml-8">
                <label htmlFor="hoehe" className="block text-sm font-medium text-gray-700">Credit Amount (DM)</label>
                <input type="number" id="hoehe" name="hoehe" value={formData.hoehe} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" min="0" />
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="sparkont" className="block text-sm font-medium text-gray-700">Savings</label>
                <select id="sparkont" name="sparkont" value={formData.sparkont} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Unknown/no savings account</option>
                  <option value="2">Less than 100 DM</option>
                  <option value="3">100 to 500 DM</option>
                  <option value="4">500 to 1000 DM</option>
                  <option value="5">1000 DM or more</option>
                </select>
              </div>
    
              <div className="mr-16 ml-8">
                <label htmlFor="beszeit" className="block text-sm font-medium text-gray-700">Employment Duration</label>
                <select id="beszeit" name="beszeit" value={formData.beszeit} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Unemployed</option>
                  <option value="2">Less than 1 year</option>
                  <option value="3">1 to 4 years</option>
                  <option value="4">4 to 7 years</option>
                  <option value="5">7 years or more</option>
                </select>
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Installment Rate as % of Disposable Income</label>
                <select id="rate" name="rate" value={formData.rate} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Less than 20%</option>
                  <option value="2">20% to 25%</option>
                  <option value="3">25% to 30%</option>
                  <option value="4">30% or more</option>
                </select>
              </div>
    
              <div className="mr-16 ml-8">
                <label htmlFor="famges" className="block text-sm font-medium text-gray-700">Personal Status and Sex</label>
                <select id="famges" name="famges" value={formData.famges} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Male: divorced/separated</option>
                  <option value="2">Female: non-single or male: single</option>
                  <option value="3">Male: married/widowed</option>
                  <option value="4">Female: single</option>
                </select>
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="buerge" className="block text-sm font-medium text-gray-700">Other Debtors</label>
                <select id="buerge" name="buerge" value={formData.buerge} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">None</option>
                  <option value="2">Co-applicant</option>
                  <option value="3">Guarantor</option>
                </select>
              </div>
    
              <div className="mr-16 ml-8">
                <label htmlFor="wohnzeit" className="block text-sm font-medium text-gray-700">Present Residence Duration</label>
                <select id="wohnzeit" name="wohnzeit" value={formData.wohnzeit} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Less than 1 year</option>
                  <option value="2">1 to 4 years</option>
                  <option value="3">4 to 7 years</option>
                  <option value="4">7 years or more</option>
                </select>
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="verm" className="block text-sm font-medium text-gray-700">Property</label>
                <select id="verm" name="verm" value={formData.verm} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Unknown/no property</option>
                  <option value="2">Car or other property</option>
                  <option value="3">Building society savings agreement/life insurance</option>
                  <option value="4">Real estate</option>
                </select>
              </div>
    
              <div className="mr-16 ml-8">
                <label htmlFor="alter" className="block text-sm font-medium text-gray-700">Age (Years)</label>
                <input type="number" id="alter" name="alter" value={formData.alter} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" min="0" />
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="weitkred" className="block text-sm font-medium text-gray-700">Other Installment Plans</label>
                <select id="weitkred" name="weitkred" value={formData.weitkred} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Bank</option>
                  <option value="2">Store</option>
                  <option value="3">None</option>
                </select>
              </div>
    
              <div className="mr-16 ml-8">
                <label htmlFor="wohn" className="block text-sm font-medium text-gray-700">Housing</label>
                <select id="wohn" name="wohn" value={formData.wohn} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Rent</option>
                  <option value="2">Own</option>
                  <option value="3">For free</option>
                </select>
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="bishkred" className="block text-sm font-medium text-gray-700">Number of Existing Credits at Bank</label>
                <select id="bishkred" name="bishkred" value={formData.bishkred} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">One credit</option>
                  <option value="2">Two to three credits</option>
                  <option value="3">Four to five credits</option>
                  <option value="4">Six or more credits</option>
                </select>
              </div>
    
              <div className="mr-16 ml-8">
                <label htmlFor="beruf" className="block text-sm font-medium text-gray-700">Job</label>
                <select id="beruf" name="beruf" value={formData.beruf} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Unemployed/unskilled non-resident</option>
                  <option value="2">Unskilled resident</option>
                  <option value="3">Skilled employee/official</option>
                  <option value="4">Management/self-employed/highly qualified employee/officer</option>
                </select>
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="pers" className="block text-sm font-medium text-gray-700">Number of Dependents</label>
                <select id="pers" name="pers" value={formData.pers} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Three or more</option>
                  <option value="2">Zero to two</option>
                </select>
              </div>
    
              <div className="mr-16 ml-8">
                <label htmlFor="telef" className="block text-sm font-medium text-gray-700">Telephone</label>
                <select id="telef" name="telef" value={formData.telef} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">No</option>
                  <option value="2">Yes (under the customers name)</option>
                </select>
              </div>
    
              <div className="ml-16 mr-8">
                <label htmlFor="gastarb" className="block text-sm font-medium text-gray-700">Foreign Worker</label>
                <select id="gastarb" name="gastarb" value={formData.gastarb} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
              </div>
    
              <div className="mt-8 text-center col-span-2"> {/* Add this div */}
            <button type="submit" className="py-2 px-6 bg-black border border-white text-xl text-white font-semibold rounded-md shadow-sm">
              Predict Credit Risk
            </button>
          </div>

            </form>
    
            {prediction && (
              <div className="mt-8 bg-gray-50 p-6 rounded-md text-center">
                <h2 className="text-xl font-semibold">Prediction Result:</h2>
                <p className="text-lg text-green-900 mt-4">{prediction}</p>
              </div>
            )}
          </div>
        </div>
      );
    };
export default Home;
