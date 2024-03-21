import React from "react";
import home_background_img from "../images/home_page_background.jpeg";
import "./components1.css"
const Home = () => {
    return ( 
        <div className="home-container1" style={{ backgroundImage: `url(${home_background_img})`,backgroundAttachment:"fixed", height:"94vh"}}>
            <div className="welcome-text1">welcome</div>
        </div>
    );
}
 
export default Home;