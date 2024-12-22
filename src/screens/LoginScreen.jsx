import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import { useDispatch,useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import photo from '../assets/pexels-dreamypixel-547114.jpg';





import React from 'react'

function LoginScreen() {

const[email,setEmail]=useState('');
const [Password,SetPassword]=useState('')

 const Navigate=useNavigate();
 const dispatch=useDispatch();

 const [login,{ isLoading }]=useLoginMutation();

 const {userInfo}=useSelector((state)=>state.auth)

 useEffect(()=>{
  if(userInfo){
    Navigate('/');
  }
 },[Navigate,userInfo])



const Submithandler=async(e)=>{
 e.preventDefault()
 try {
 
  const res=await login({email,Password}).unwrap();
  dispatch(setCredentials({...res}))
  Navigate('/')
 } catch (err) {
  
  toast.error(err?.data?.message||err.error);
 }
}

  return (
    <div
    style={{
      backgroundImage: `url(${photo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%'
    }}
     className=" flex items-center   ">
      
   <div className="login-page   ">
   
      <div className="login-form">
      
        <h1>Login</h1>
        <form  onSubmit={Submithandler} >
        <div className="form-container">
          <div className="input-group">
            <label>Email</label>
            <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)} className=" border border-rounded " placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password"   value={Password} onChange={ (e)=>SetPassword(e.target.value)}  className=" border border-rounded" placeholder="Enter your password" required />
          </div>
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="links">
            <a href="#">Forgot Password?</a>
            <p>
                Don't have an account? <Link to={'/register'}><a href="#">Sign Up</a></Link>
              </p>
              {/* Link to navigate to QR Code Scan Page */}
              <p>
                Or <Link to="/Qrlogin">Login with QR Code</Link>
              </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default LoginScreen
