import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import { Button } from 'react-bootstrap';


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import app from "../firebase.js"
import {getAuth} from "firebase/auth"

import home_background_img from "../images/home_page_background.jpeg";


const Registerpage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [flagg, setFlagg] = useState(0);
  const auth = getAuth(app)
  const [phone,setPhone] = useState("")
  const [userr, setuserr] = useState(null)
  const [otp, setOtp] = useState("")

   const sendOtp = async ()=>{
        try{
          const recaptcha = new RecaptchaVerifier(auth,'recaptcha',{});
          const confirmation = await signInWithPhoneNumber(auth,phone,recaptcha)
          setuserr(confirmation)
          // console.log(confirmation)
        }catch(err){
            window.alert("please refresh and try again")
          console.log(err);
        }
      }
      const verifyOtp =async () =>{
        try{
          const data = await userr.confirm(otp)
          console.log(data)
          window.alert("otp verified")
          setFlagg(1);
        }catch(err){
          console.log(err);
          window.alert("please enter correct otp")
        }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (flagg == 0) {
          alert("please verify otp")
          return;
        }
        try {
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, formData);
          // here store a variable named highestscore in the local storage with the value of 0
          localStorage.setItem('highestscore', 0);  
          navigate('/loginpage');
        } catch (error) {
          alert(error.response.data.error);
        }
      };
  
  return (
    <section className='regisection' style={{ overflowY: "auto", backgroundImage: `url(${home_background_img})`, height: "100vh", backgroundSize: "cover", backgroundPosition: "center"}}>
    <div className="regiform-box" >
        <div className="regiform-value">
            <form onSubmit={handleSubmit}>
                <h2 className='regi-title'>Register</h2>

                <div className="regiinput-box">
                    <ion-icon name="input-outline"></ion-icon>
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <label htmlFor="text">Username</label>
                </div>
                <div className="regiinput-box">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="text">Email</label>
                </div>
                <div className="regiinput-box">
                    <ion-icon name="eye-off-outline"></ion-icon>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <label htmlFor="password">Password</label>
                </div>
              <div>

              <h1 style={{textAlign:"center",color:"white"}}>OTP verification</h1>
              
                <div className="regiinput-box">
                <ion-icon name="call-outline"></ion-icon>
                    <PhoneInput country={"us"} value={phone} onChange={(phone)=>setPhone("+"+phone)}/>
                </div>

                <button className='otpbutton' onClick={sendOtp}> send otp</button>
                <div id="recaptcha"></div>
                <br></br>

                <div className="regiinput-box">
                    <ion-icon name="input-outline"></ion-icon>
                    <input type="text" name="Enter OTP" placeholder="Enter Otp"  onChange={(e)=> setOtp(e.target.value)} required />
                    <label htmlFor="text">Enter OTP</label>
                </div>

                <button className='otpbutton' onClick={verifyOtp}> verify otp</button>
                <br></br>
              </div>
              
                <button type="submit"onClick={handleSubmit} className='regibutton'>
                    Register
                </button>
            </form>
        </div>
    </div>
    </section>
  );
};

export default Registerpage;
