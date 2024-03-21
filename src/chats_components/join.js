import React ,{useEffect , useState}from "react";
import {Link} from "react-router-dom";
import "./components_style.css"

const Join= ()=>{
    const [name,setName]=useState("");
    const [room,setRoom]=useState("");

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer" style={{borderRadius:"50px",boxShadow:"10px 10px 10px white"}}>
                <h1 className="heading">Join</h1>
                {/* input for the name of the user */}
                <div>
                    <input 
                    className="joinInput" 
                    type="text" 
                    placeholder="Enter Name"
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                {/* input for the room */}
                <div>
                    <input 
                    className="joinInput" 
                    type="text" 
                    placeholder="Enter Room"
                    onChange={(e)=>setRoom(e.target.value)}
                    />
                </div>
                {/* button to join sending the name and room to the chat */}
                <Link 
                onClick={(e)=> (!name || !room) ? e.preventDefault() : null}
                to={`/chat?name=${name}&room=${room}`}>
                    <button className="button" type="submit">Sigh In</button>
                </Link>

            </div>
        </div>
    )
}

export default Join