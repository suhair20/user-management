import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form ,Button,Row,Col} from 'react-bootstrap'
import FormContainer from "../components/FormContainer";
import { useDispatch,useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import photo from '../assets/pexels-dreamypixel-547114.jpg';







import React from 'react'

function RegisterScreen() {

const[email,setEmail]=useState('')
const[name,setName]=useState('')
const [Password,SetPassword]=useState('')
const [ConfirmPassword,SetConfirmPassword]=useState('')

const navigate=useNavigate()
const dispatch=useDispatch()

const [register,{isLoading}]=useRegisterMutation()


const {userInfo }=useSelector((state)=>state.auth)


const Submithandler=async(e)=>{
 e.preventDefault()
 console.log("Submithandler called");
 try {
  console.log("Submithandler calle66d");
  const res=await register({name,email,Password}).unwrap()
  console.log(res);
  
  dispatch(setCredentials({...res}))
  console.log("logged");
  
  const qrCodeImage=res.qrCodeImage
  
  
  localStorage.setItem('qrCode',qrCodeImage)
   navigate('/qrCode')
} catch (err) {
  
    toast.error(err?.data?.message||err.error);
   }
}

useEffect(()=>{
  if(userInfo && window.location.pathname !== '/qrCode'){
      navigate('/')
  }
},[navigate,userInfo])

  return (
    <div
    style={{
      backgroundImage: `url(${photo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%'
    }}
     className=" flex items-center  justify-center  ">
    
   <div className="login-page   ">
      
         <div className="login-form">
         
           <h1>Signup</h1>
           <form  onSubmit={Submithandler} >
           <div className="form-container">
             <div className="input-group">
               <label>Name</label>
               <input type="Name" value={name} onChange={(e)=>setName(e.target.value)} className=" border border-rounded " placeholder="Enter your email" required />
             </div>
             <div className="input-group">
               <label>Email</label>
               <input type="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className=" border border-rounded" placeholder="Enter your password" required />
             </div>
             <div className="input-group">
               <label>Password</label>
               <input type="password" value={Password}  onChange={(e)=>SetPassword(e.target.value)} className=" border border-rounded" placeholder="Enter your password" required />
             </div>
             <div className="input-group">
               <label>Password</label>
               <input type="password" value={ConfirmPassword}  onChange={(e)=>SetConfirmPassword(e.target.value)} className=" border border-rounded" placeholder="Enter your password" required />
             </div>
             </div>
             <button type="submit" className="login-button">Login</button>
             <div className="links">
               
               <p>
              
               alredy have a acount?  <Link to={'/Login'} > <a href="#">Sign in</a></Link>
               </p>
             </div>
           </form>
         </div>
       </div>
    </div>
  )
}

export default RegisterScreen
