import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
//bootstrap

import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";

const Headlines =()=>{
    const navigate = useNavigate("");
    const [search, setSearch] = useState("");
    const [item, setItem] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/headlines`).then((arr) => {
        setItem(arr.data);
        });
    }, []);

    return(
      <div style={{backgroundColor: "rgb(255, 218, 185)",padding: '2%', border: '8px solid black'}}>
        <div className="card_container" >
          
          <div className="search-container">
          <label style={{color:"black",fontWeight:"bold",paddingRight:"10px"}}>Search</label>
            <input
              type="text"
              placeholder="Search by district"
              value={search}
              onChange={(e)=>{
                setSearch(e.target.value);
              }}
              style={{fontSize:"20px",fontWeight:'bold',color:"black",boxShadow: '0px 0px 20px rgba(255, 165, 0, 0.5)'}}
            />
          </div>
          
        <div className="card_box-container " style={{ display: "flex", flexWrap: "wrap" }}>
          {item
            .filter((temp) =>
              temp.district.toLowerCase().includes(search.toLowerCase())
            )
            .map((temp) => (
              <Card
                className="card_box custom-border-container"
                style={{ width: "25rem", margin: "2%",boxShadow: '0px 0px 20px rgba(255, 165, 0, 0.5)'  }}
              >
                <Card.Body>
                    <Card.Title style={{fontSize:'24px',fontWeight:'bold'}}>{temp.title}</Card.Title>
                    <Card.Title style={{fontSize:'18px'}}>{temp.heading}</Card.Title>
                    <Card.Title style={{fontSize:'20px',fontWeight:'bold'}}>{temp.district}</Card.Title>
                    
                    <Button style={{backgroundColor:"rgb(240, 170, 100)",color:"black",fontWeight:"bold"}}>
                    <Nav.Link href={`/newsdashboard/viewnews/${temp._id}`}>view news</Nav.Link>
                    </Button>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
      </div>
    )
}
export default Headlines