import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { Card, Form, Button } from 'react-bootstrap';
import { useSpeechSynthesis } from 'react-speech-kit';

const Readnews =()=>{
    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { speak, voices } = useSpeechSynthesis();
    const [voiceIndex, setVoiceIndex] = useState(null);
    const [inputText, setInputText] = useState('');
    const [rate, setRate] = useState(0.5);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [utterance, setUtterance] = useState(null);

    function handleSpeak() {
        const newUtterance = new SpeechSynthesisUtterance(items[currentIndex].body);
        newUtterance.voice = voices[voiceIndex] || voices[0];
        newUtterance.rate = rate;
        newUtterance.onend = () => setIsSpeaking(false);
        speak(newUtterance);
        setIsSpeaking(true);
        setUtterance(newUtterance);
    }

    function handleStop() {
        if (utterance && isSpeaking) {
            utterance.onend = null; // Remove the onend event handler
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/headlines`).then((response) => {
        setItems(response.data);
        });
    }, []);

    const goToNextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        handleStop()
    };

    const goToPreviousItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
        handleStop()
    };

    

    return(
      <div style={{backgroundColor: "rgb(255, 218, 185)",padding: '20px',margin: '0px', border: '8px solid black'}}>
        <div className="container custom-border-container" >
      <div className="card custom-border-container" style={{border: '3px solid black',boxShadow: '0px 0px 20px rgb(255, 218, 185)',padding: '2%'}}>
        {items.length > 0 && (
          <div className="card-body">
            <h2 className="card-title text-center mb-4">{items[currentIndex].title}</h2>

            <div className="row mb-3 custom-border-container">
              <div className="col-md-6">
                <h4 className="mb-2">Heading</h4>
                <p>{items[currentIndex].heading}</p>
              </div>
              <div className="col-md-6">
                <h4 className="mb-2">District</h4>
                <p>{items[currentIndex].district}</p>
                <h4 className="mb-2">Location</h4>
                <p>{items[currentIndex].location}</p>
              </div>
            </div>

            <div className="mb-4 custom-border-container">
              <h4>Body</h4>
              <div className="border p-3" style={{border: '3px solid black',boxShadow: '0px 0px 20px rgb(255, 218, 185)',padding: '2%',margin: '2%'}}>
                {items[currentIndex].body}
              </div>

              <div className="voice-controls">
                <select
                  className="voice-select"
                  value={voiceIndex || ''}
                  onChange={(e) => setVoiceIndex(e.target.value)}
                >
                  <option value=''>Default</option>
                  {voices.map((item, index) => (
                    <option key={item.name} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <div className="rate-control">
                  <input
                    type='range'
                    min='0.5'
                    max='5'
                    step='0.01'
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  <div className="rate-label">
                    Current speech rate is {rate}
                  </div>
                </div>

                <div className="button-container" style={{display: 'flex'}}>
                  <button className="speak-button" onClick={handleSpeak} style={{margin: '2%',padding: '1%',border: '3px solid black', borderRadius: '10px'}}>
                    Speak
                  </button>
                  <button className="stop-button" onClick={handleStop} style={{margin: '2%',padding: '1%',border: '3px solid black', borderRadius: '10px'}}>
                    Stop
                  </button>
                </div>
              </div>
            </div>

            

            <div className="mb-4 custom-border-container">
              <h4>Conclusion</h4>
              <div className="border p-3"  style={{border: '3px solid black',boxShadow: '0px 0px 20px rgb(255, 218, 185)',padding: '2%',margin: '2%'}}>{items[currentIndex].conclusion}</div>
            </div>
          </div>
        )}

        <div className="card-footer d-flex justify-content-between">
          <button className="btn " onClick={goToPreviousItem} style={{backgroundColor:"rgb(240, 170, 100)",color:"black",fontWeight:"bold"}}>
            Previous
          </button>
          <button className="btn " onClick={goToNextItem} style={{backgroundColor:"rgb(240, 170, 100)",color:"black",fontWeight:"bold"}}>
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
    )
}
export default Readnews