import React, { useState } from "react";
import "./components_style.css"

const Input=({message,setMessage,sendMessage})=>{
    return(
        <form className="form">
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e)=>setMessage(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' ? sendMessage(e) : null}
            />
            <button className="sendButton" onClick={(e)=>sendMessage(e)}>Send</button>
        </form>
    )
}

export default Input