import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { Html5Qrcode } from "html5-qrcode";
import photo from "../assets/pexels-dreamypixel-547114.jpg";

function QrLogin() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scannerRef = useRef(null);
  const [qrScanner, setQrScanner] = useState(null);

  useEffect(() => {
    const initializeScanner = async () => {
      try {
        if (scannerRef.current) {
          const html5QrCode = new Html5Qrcode(scannerRef.current.id);
          setQrScanner(html5QrCode);
        }
      } catch (error) {
        console.error("Error initializing QR Scanner:", error);
      }
    };
    initializeScanner();

    return () => {
      if (qrScanner) {
        qrScanner.stop().catch(console.error);
      }
    };
  }, []);

  const startScanning = () => {
    if (qrScanner) {
      qrScanner
        .start(
          { facingMode: "environment" },
          {
            fps: 10, // Frames per second
            qrbox: 250, // Size of scanning box
          },
          async (decodedText) => {
            try {
              const res = await login({ qrCode: decodedText }).unwrap();
              dispatch(setCredentials({ ...res }));
              navigate("/");
            } catch (err) {
              console.error(err);
              toast.error(err?.data?.message || err.error);
            }
          }
        )
        .catch((err) => {
          console.error("Error starting QR scanner:", err);
        });
    }
  };

  const stopScanning = () => {
    if (qrScanner) {
      qrScanner.stop().catch(console.error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${photo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
      className="flex items-center justify-center"
    >
      <div className="login-page">
        <div className="login-form">
          <h1>Login with QR Code</h1>
          <p>Scan the QR Code to login</p>
          <div
            id="qr-reader"
            ref={scannerRef}
            style={{
              width: "300px",
              height: "250px",
              border: "1px solid black",
              margin: "auto",
            }}
          ></div>
          <div className="mt-4">
            <button
              onClick={startScanning}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Start Scanning
            </button>
            <button
              onClick={stopScanning}
              className="px-4 py-2 bg-red-500 text-white rounded ml-2"
            >
              Stop Scanning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrLogin;


