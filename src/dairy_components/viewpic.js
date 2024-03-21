import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { NavLink } from "react-router-dom";
import "../App.css";
import "./dairycomponents.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import CircleLoader from "react-spinners/CircleLoader";
const Viewpic = () => {
    const [email, setEmail] = useState("");
    const [mediaData, setMediaData] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading]= useState(false);
    useEffect(() => {
        setLoading(true);
        window.onload = () => {
            setLoading(false); 
        };
        return () => {
            window.onload = null;
        };
    }, []);

    const gethandler=(e)=>{
      e.preventDefault()
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/viewimgs/${email}`).then((res)=>{
        setSubmitted(true)
        setMediaData(res.data);
        console.log(res.data)
      }).catch((error)=>{
        console.log(error)
      })
    }

    const renderImages = () => {
      const imageItems = mediaData
        .filter((item, index) =>item.imgUrl)
        .map((item, index) => (
          <div>
          <div key={index} className="imagese"style={{backgroundColor:"#FF6655",display:"flex",flexWrap:"wrap"}}>
            
            <img className="image-item" height={"300px"} width={"300px"} src={item.imgUrl} alt={`Image ${index}`} />
          </div>
          </div>
        )); 
      return (
        <div >
          <h2>Images</h2>
          <br></br>
          <div className="images-container">{imageItems}</div>
        </div>
      );
    };
  
    const renderVideos = () => {
      const videoItems = mediaData
        .filter((item, index) => item.videoUrl)
        .map((item, index) => (
          <div key={index}>
            <video controls className="video-item" style={{ width: '100%', height: 'auto',padding:"2.5%" }}>
              <source src={item.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ));
    
      return (
        <div>
          <h2>Videos</h2>
          <br></br>
          <div className="videos-container">{videoItems}</div>
        </div>
      );
    };

    return (
      <div>
        {
          loading ? 
          <CircleLoader
          color={"#36d7b7"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />:<div style={{ padding: "100px",backgroundColor: "#FF6655" }}>

        <Form onSubmit={gethandler} style={{border:"4px solid black", backgroundColor:"white",padding:"2.5%",borderRadius:"10px"}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email to get the list" value={email} required onChange={(e) => setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {submitted===true && (
        <div>
          {renderImages()}
          {renderVideos()}
        </div>
      )}
    </div>
        }
        
      </div>
    );
}

export default Viewpic;
