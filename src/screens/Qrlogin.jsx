import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { Html5Qrcode } from "html5-qrcode";
import photo from "../assets/pexels-dreamypixel-547114.jpg";

function QrLogin() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scannerRef = useRef(null); // Ref for the scanner div
  const qrCodeScannerRef = useRef(null); // Ref to store Html5Qrcode instance

  useEffect(() => {
    // Ensure scanner is only initialized if it hasn't been already
    if (!qrCodeScannerRef.current) {
      const html5QrCode = new Html5Qrcode(scannerRef.current.id);
      qrCodeScannerRef.current = html5QrCode;

      // Start the scanner
      html5QrCode
        .start(
          { facingMode: "environment" },
          {
            fps: 10, // Frames per second
            qrbox: 250, // Size of the scanning box
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

    // Cleanup to stop and clear the scanner
    return () => {
      if (qrCodeScannerRef.current?.isScanning) {
        qrCodeScannerRef.current
          .stop()
          .then(() => qrCodeScannerRef.current.clear())
          .catch((err) => console.error("Error stopping QR scanner:", err));
      }
    };
  }, [dispatch, login, navigate]);

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
              height: "300px",
           
              margin: "auto",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default QrLogin;


