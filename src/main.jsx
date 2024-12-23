import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import store from './Store.js'
import {Provider} from 'react-redux' 
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import HomeScreens from './screens/HomeScreens.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import AdminHomeScreen from './screens/AdminHomeScreen.jsx'
import QrcodeScreen from './screens/QrcodeScreen.jsx'
import Qrlogin from './screens/Qrlogin.jsx'



const router =createBrowserRouter(
   createRoutesFromElements(
    <Route path='/' element={<App/>} >
      <Route path='/' element={<HomeScreens/>} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      <Route path='/admin' element={<AdminHomeScreen/>} />
      <Route path='/qrCode' element={<QrcodeScreen/>} />
      <Route path='/qrlogin'  element={<Qrlogin/>}/>

    </Route>
   )
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store} >
  <React.StrictMode>
    
   <RouterProvider router={router} />
    
  </React.StrictMode>
  </Provider>
)
