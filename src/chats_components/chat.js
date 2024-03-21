import React,{useEffect,useState} from "react";
import queryString from 'query-string'
import io from 'socket.io-client'

// components
import InfoBar from "./infobar";
import Input from "./input";
import Messages from "./messages";

import "./components_style.css"

let socket;

const Chat= ()=>{
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')

    const [message, setMessage]= useState('')
    const [messages, setMessages] = useState([]);

    const endPoint = process.env.REACT_APP_SOCKETS_URL;
    useEffect(()=>{
        // queryString used to get the query parameters from the url
        const {name,room} = queryString.parse(window.location.search);
        socket = io(endPoint);
        setName(name);
        setRoom(room); 
        // console.log(name,room,socket);

        // we are creating an event and giving some payload which is futher used in backend
        socket.emit('join',{name,room},()=>{
            
        })
        // unmonting the component
        return ()=>{
            // socket.emit('disconnect');
            // socket.off();
            socket.disconnect();
        }
    },[endPoint,window.location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            // adding message to the list
            setMessages([...messages,message]);
        })
    },[messages]);

    // function for sending messages
    const sendMessage = (e)=>{
        e.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }

    console.log(message,messages)
    return(
        <div className="outerContainer" >
            <div className="container1" > 
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                
            </div>
        </div>
    )
}

export default Chat