import React from "react";
import "../App.css";
import home_background_img from "../images/home_page_background.jpeg";
const Aboutus = () => {

    return (
        <div style={{margin:"5px",border:"4px solid black",padding:"10px", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundImage: `url(${home_background_img})`, height:"93vh" }}>
            <div className="about-section">
                <h1 style={{textAlign:"center",color:"white",margin:"30px"}}>About Us</h1>
            </div>
            <div className="row">
            <div className="column" style={{display:"flex",justifyContent:"center",}}>
                <div className="card" style={{margin:"9%",border:"4px solid black",padding:"50px", borderRadius:"20px"}}>
                <div className="container" style={{textAlign:"center"}}>
                    <h2>Macha.Vivek</h2>
                    <p className="title">Student</p>
                    <p>I am currently studing in keshav Memorial Insitute of Technology where I learned MERN technology which helped me in doing this website</p>
                    <p>machavivek2003@gmail.com</p>
                    <p><button className="button" style={{backgroundColor:"#004080",color:"white"}}>Contact</button></p>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}
export default Aboutus;