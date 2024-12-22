import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import {  useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

function Qrlogin() {
   
        const [scannedData, setScannedData] = useState('');

        const [login,{isLoading}]=useLoginMutation();
        const Navigate=useNavigate();
         const dispatch=useDispatch();
        

      
        const handleScan = async (data) => {
            if (data) {
              try {
                const scannedText = data.text || 'No text found in the QR code'; // Extract text
                setScannedData(scannedText);
          
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
    <div className='login-page' >
      <div className="login-form">
      <h1>Login with QR Code</h1>
      <p>Scan the QR Code to login</p>

      {/* QR Code Scanner */}
      <QrScanner
        delay={300}
        style={{ width: '100%' }}
        
        onScan={handleScan}
      />
      
      {scannedData && <p>Scanned Data: {scannedData}</p>}
    </div>
    </div>
  )
}

export default Qrlogin
