import React from "react";
import "./components_style.css"

import closeIcon from "./icons/close.png"
import onlineIcon from "./icons/online.png"
const InforBar = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img 
                className="onlineIcon" src={onlineIcon} 
                alt="online img"
                style={{ width: '24px', height: '24px' }}/>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/">
                    <img src={closeIcon} 
                    alt="close img" 
                    style={{ width: '24px', height: '24px' }}/>
                </a>
            </div>
        </div>
    )
}

export default InforBar