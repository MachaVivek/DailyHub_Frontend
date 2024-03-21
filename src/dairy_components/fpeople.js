import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../App.css";

import {
  Col,
  Image,
  Row,
} from 'react-bootstrap';

const Fpeople = () => {
    const [email,setEmail]=useState("")
    const [pename,setPename]=useState("")
    const [why,setWhy]=useState("")
    const [finala,setFinala]=useState([[]])

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastCard = currentPage * 5;
    const indexOfFirstCard = indexOfLastCard - 5;
    const currentCards = finala.slice(indexOfFirstCard, indexOfLastCard);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const submithandler = (e) => {
        e.preventDefault();
        var pattern = /^([a-zA-Z0-9])+@gmail.com/;
        try {
          let f1 = 0;
          if (pattern.test(email) === true) {
            f1 = 1;
          } else {
            alert("email should contain combinatation of letters and numbers");
          }
          if (f1 === 1) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/postfpeople`, {
              email: email,
              pename: pename,
              why:why,
            });
            window.alert("added successfully")
          }
        } catch (err) {
          console.log(err);
          window.alert("something went wrong")
        }
      };

      const [emaill,setEmaill]=useState("")
      const gethandler=(e)=>{
        e.preventDefault()
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/getfpeople/${emaill}`).then((res)=>{
            let x=0;
            for(let i=0;i<emaill.length;i++){
                x+=emaill[i].charCodeAt()
            }
            const usingkeyde=(s)=>{
              let finall="";
                let temp="";
                for(let i=0;i<s.length;i++){
                    if(s[i]=='#'){
                        finall+=(String.fromCharCode(parseFloat(temp)*17/x))
                        temp=""
                    }else{
                        temp+=s[i]
                    }
                }
                return finall
            }
            
          let final=[]
          for(let i=0;i<res.data["data"].length;i++){
            final.push({
              pename:usingkeyde(res.data["data"][i]["pename"]),
              why:usingkeyde(res.data["data"][i]["why"]),
              date:res.data["data"][i]["date"].slice(0,10)
            })
          }
          console.log(final)
          setFinala(final)
        }).catch((error)=>{
          console.log(error)
        })
      }
    return (  
      <div style={{border:"4px solid black", backgroundColor:"#A1FFA1",padding:"2%" }}>
      <h1 style={{textAlign:"center",color:"black"}}>Favorite People In Your Life</h1>

      <div style={{margin:"5px",padding:"10px",backgroundColor:"#A1FFA1"}}>
      <div style={{margin:"5px",border:"4px solid black",padding:"10px",backgroundColor:"white",borderRadius:"15px"}}>
            <Form onSubmit={gethandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email to get the list" value={emaill} required onChange={(e) => setEmaill(e.target.value)}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            </div>
              {currentCards.map((ind) => (
              <div  style={{margin:"2%",border:"4px solid black",padding:"1%",backgroundColor:"#A1FFA1",borderRadius:"15px",color:"black",textAlign:"left"}}>
                <br/>
                date : <div className="showtext"> 
                 {ind.date}
                </div>
                <br/>
                 place : <div className="showtext"> 
                 {ind.pename}
                </div>
                <br/>
                Reason : <div className="showtext"> 
                 {ind.why}
                </div>
                
              </div>
            ))}
            </div>
            <Pagination
                        cardsPerPage={5}
                        totalCards={finala.length}
                        paginate={paginate}
                    />

            <br/>
            
            <br/>

            
            <div style={{margin:"5px",border:"4px solid black",padding:"10px",backgroundColor:"white",borderRadius:"15px", color:"white",textAlign:"left"}}>
            <Form onSubmit={submithandler} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email to insert the person" name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-sm">Person Name </InputGroup.Text>
                  <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    name="fplace"
                    required
                    value={pename}
                    onChange={(e) => setPename(e.target.value)}
                  />
                </InputGroup>

                <InputGroup>
                <InputGroup.Text>Reason</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" 
                  name="reason"
                    required
                    value={why}
                    onChange={(e) => setWhy(e.target.value)} />
              </InputGroup>
              <br/>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            </div>
            <Button variant="success"><NavLink to="/dairydashboard" style={{color:"white"}}>Home page</NavLink></Button>{' '}
        </div>
    );
}

const Pagination = ({ cardsPerPage, totalCards, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
      pageNumbers.push(i);
  }

  return (
      <nav style={{display:"flex",justifyContent:"center"}}>
          <ul className='pagination'>
              {pageNumbers.map(number => (
                  <li key={number} className='page-item' style={{margin:"2%",padding:"2%"}}>
                      <a onClick={() => paginate(number)} href='javascript:void(0)' className='page-link'>
                        {number}
                    </a>
                  </li>
              ))}
          </ul>
      </nav>
  );
};

 
export default Fpeople;