import React, { useEffect,useState} from 'react';
import QrScanner from 'react-qr-scanner';
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import {  useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import photo from '../assets/pexels-dreamypixel-547114.jpg';

function Qrlogin() {
   
     

        const [login,{isLoading}]=useLoginMutation();
        const Navigate=useNavigate();
         const dispatch=useDispatch();
         const [cameraId, setCameraId] = useState(null);

         useEffect(() => {
          const getBackCamera = async () => {
            try {
              const devices = await navigator.mediaDevices.enumerateDevices();
              const videoDevices = devices.filter(device => device.kind === 'videoinput');
              const backCamera = videoDevices.find(device => device.label.includes('back') || device.label.includes('environment'));
      
              if (backCamera) {
                setCameraId(backCamera.deviceId);
              }
            } catch (error) {
              console.error('Error accessing devices:', error);
            }
          };
      
          getBackCamera();
        }, []);
        

      
        const handleScan = async (data) => {
            if (data) {
              try {
                const scannedText = data.text || 'No text found in the QR code'; // Extract text
               
          
                // Call the login function with the scanned text
                const res = await login({ qrCode:scannedText }).unwrap();
                dispatch(setCredentials({ ...res }));
          
                // Redirect or take further action after successful login
                Navigate('/');
              } catch (err) {
                console.error(err);
                toast.error(err?.data?.message || err.error);
              }
            }
          };
    


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
    <div className='login-page' >
      <div className="login-form">
      <h1>Login with QR Code</h1>
      <p>Scan the QR Code to login</p>

      {/* QR Code Scanner */}
      <QrScanner
        delay={300}
        style={{ width: '80%' }}
        videoConstraints={{
          facingMode: 'environment',
          deviceId: cameraId, 
        }}
        onScan={handleScan}
      />
      
      
    </div>
    </div>
    </div>
  )
}

export default Qrlogin
