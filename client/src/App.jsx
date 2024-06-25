import { BrowserRouter , Routes , Route } from 'react-router-dom'
import React from 'react'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
        <>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
        
      <Route path = "/" element={< SignIn />}/>
      <Route path = "/sign-up" element={<SignUp />}/>
      <Route path = "/home" element={<Home />}/>

      </Routes>

      
      </BrowserRouter>
    </>
  )
}

export default App;
