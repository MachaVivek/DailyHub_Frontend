import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import useClipboard from 'react-use-clipboard'

const Uploadnews =()=>{
    const startLin =()=> SpeechRecognition.startListening({continuous:true,language:'en-IN'});
    
    const [textToCopy,setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy);
    const {transcript, browserSupportSpeechRecognition,resetTranscript} = useSpeechRecognition();

    const navigate = useNavigate();
    const [user,setUser]= useState({
        title:"",heading:"",district:"",location:"",body:"",conclusion:""
    });

    let name,value;
    const handleInputs =(e)=>{
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const stopListening = () => {
        setUser({ ...user, body: user.body + " " + transcript });
        resetTranscript();
    };

    const postData = async(e)=>{
        e.preventDefault();  // to prevent the refresh the page
        const {title,heading,district,location,body,conclusion} = user;  // object destructreing
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/newsupload`,{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({
                title,heading,district,location,body,conclusion
            })
        });
        const data = await res.json();
        if(res.status === 422 || !data || res.status === 500){
            window.alert("news not posted")
        }else{
            window.alert("news posted successful");
        }
    }
    return(
            <div style={{padding:"20px",border:"4px solid black",margin:"50px"}}>
            <h1 style={{textAlign:"center"}}>Post the news here</h1>
            <br/>

            <Form method="POST">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name="title" required autoComplete="off" value={user.title} onChange={handleInputs}
                     />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Headings</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Enter heading" name="heading" required autoComplete="off" value={user.heading} onChange={handleInputs}
                     />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDistrict">
                    <Form.Label>District</Form.Label>
                    <Form.Control type="text" placeholder="Enter district" name="district" required autoComplete="off" value={user.district} onChange={handleInputs} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter location" name="location" required autoComplete="off" value={user.location} onChange={handleInputs} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={10} placeholder="Enter news body" name="body" required autoComplete="off" value={user.body} onChange={handleInputs} />

                    <div className="container mt-5 border border-4 border-dark rounded p-4">
                        <div onClick={() => setCopied(transcript)} className="mb-3">
                            {transcript}
                        </div>
                        <Button variant="primary" className="me-2" onClick={setCopied}>
                            {isCopied ? "Copied" : "Copy"}
                        </Button>
                        <Button variant="success" className="me-2" onClick={startLin}>
                            Start Listening
                        </Button>
                        <Button variant="danger" onClick={stopListening}>
                            Stop Listening
                        </Button>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConclusion">
                    <Form.Label>Conclusion</Form.Label>
                    <Form.Control as="textarea" rows={6} placeholder="Enter conclusion" name="conclusion" required autoComplete="off" value={user.conclusion} onChange={handleInputs} />
                </Form.Group>
                

                
                <Button variant="primary" type="submit" onClick={postData}> Submit </Button>
            </Form>
        </div>
    )
}
export default Uploadnews