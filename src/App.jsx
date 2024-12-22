import React from 'react'
import Header from './components/Header'
import AdminHeader from './components/AdminHeader'
import {Container } from 'react-bootstrap'
import {Outlet,useLocation} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const location =useLocation()

const isAdminPath=location.pathname.startsWith('/admin')
  return (
    <>
    {isAdminPath?<AdminHeader/>:<Header/>}
    <ToastContainer/>
    <div >
    <Outlet/>
    </div>
    </>
  )
}

export default App
