 import React from 'react'
 import { useEffect,useState } from 'react'
 import photo from '../assets/pexels-dreamypixel-547114.jpg';


 
 function QrcodeScreen() {

  const [qrCode,setQrcode]=useState('')

  useEffect(()=>{
    const storeqrcode=localStorage.getItem('qrCode')
    console.log("heloo",storeqrcode);
    
     console.log(qrCode);
     
    if(storeqrcode){
        setQrcode(storeqrcode)
    }

  },[])
     
   return (
     <div>
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
          
             <div className="login-form ">
             
               <h1>qr code</h1>
               
               <div className="">
               <div>
          
          <img src={qrCode} alt="QR Code" />
          
        </div>
        <a href={qrCode} download="qr-code.png">Download QR Code</a>
                 </div>
              
                 <div className="links">
                   
                   <p>
                  
                   if you forgot your password you can login with this qr code  
                   </p>
                 </div>
               
             </div>
           </div>
           </div>
     </div>
   )
 }
 
 export default QrcodeScreen

 