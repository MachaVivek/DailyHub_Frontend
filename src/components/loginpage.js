import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import home_background_img from "../images/home_page_background.jpeg";

const Loginpage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const path=`${process.env.REACT_APP_BACKEND_URL}/login`
      const response = await axios.post(path, formData);
      // alert(response.data.token);
        // store token in cookies
        document.cookie = `token=${response.data.token}; path=/;`;
        console.log(formData.email);
        console.log(process.env.REACT_APP_ADMIN_EMAIL);
        if(formData.email == `${process.env.REACT_APP_ADMIN_EMAIL}`) {
          //  redirect to admin page after successful login if admin is logged in
            navigate('/adminpage');
        }else{
          // Redirect to protected dashboard page after successful login if user is logged in
          navigate('/dashboard');
        }
      
      
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      alert(error.response.data.error);
    }
  };

  return (
    <section className='loginsection' style={{ overflowY: "auto", backgroundImage: `url(${home_background_img})`, height: "100vh", backgroundSize: "cover", backgroundPosition: "center"}}>
            <div className="loginform-box" style={{margin:"10%",padding:"12%", borderRadius:"20px"}}>
                <div className="loginform-value">
                    <form onSubmit={handleSubmit}>
                        <h2 className='login-title'>Login</h2>

                        <div className="logininput-box">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="email" required name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            <label htmlFor="text">Email</label>
                        </div>

                        <div className="logininput-box">
                            <ion-icon name="eye-off-outline"></ion-icon>
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button type="submit" className='loginbutton'>
                            Login
                        </button>
                        
                        <div className="loginregister">
                            <label>Don't have an account
                            <br></br>
                                <div style={{alignContent:"center",justifyContent:"center", display:"flex"}}>
                                <a href="/registerpage">Register</a>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </section>
  );
};

export default Loginpage;
