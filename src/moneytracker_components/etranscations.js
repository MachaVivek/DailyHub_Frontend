// FinancePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import money_transcations_img from "../images/money_transcations_img2.jpg";
import { useNavigate } from 'react-router';


const Transcations = () => {
  const navigate = useNavigate();

  const [incomeForms, setIncomeForms] = useState([]);
  const [expenseForms, setExpenseForms] = useState([]);
  const [searchMonth, setSearchMonth] = useState('');
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        if (!token) {
          alert('Please login first');
          navigate('/loginpage');
          return;
        }
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserId(response.data.userData.userId);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        navigate('/loginpage');
        // Clear the token in the document cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchIncomeAndExpenseForms = async () => {
      try {
        if (!userId) return; // If userId is not set, exit early
        const incomeResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getincomeforms/${userId}`);
        setIncomeForms(incomeResponse.data);
        const expenseResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getexpenseforms/${userId}`);
        setExpenseForms(expenseResponse.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchIncomeAndExpenseForms();
  }, [userId]);

  const handleSearch = (e) => {
    setSearchMonth(e.target.value);
  };
  const filteredIncomeForms = incomeForms.filter(form => {
    if (!searchMonth) return true;
    const formDate = new Date(form.date);
    return formDate.getMonth() + 1 === parseInt(searchMonth.split("-")[1]);
  });

  const filteredExpenseForms = expenseForms.filter(form => {
    if (!searchMonth) return true;
    const formDate = new Date(form.date);
    return formDate.getMonth() + 1 === parseInt(searchMonth.split("-")[1]);
  });

  const handleIncomeDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteincome/${id}`);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getincomeforms/${userId}`);
      setIncomeForms(response.data);
    } catch (error) {
      console.error('Error deleting income form:', error);
    }
  };

  const handleExpenseDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteexpense/${id}`);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getexpenseforms/${userId}`);
      setExpenseForms(response.data);
    } catch (error) {
      console.error('Error deleting expense form:', error);
    }
  };

  return (
    <div className="finance-page" style={{ backgroundImage: `url(${money_transcations_img})`}}>
      <div style={{flexDirection:"row", marginLeft:"2%", marginRight:"2%", marginBottom:"1%",backgroundColor: "rgba(128, 128, 128, 0.4)", backdropFilter:"blur(6px)", color:"white", fontWeight:"bold", fontFamily:"cursive", borderRadius:"5%"}}>
        <span style={{marginRight:"2%", marginLeft:"2%",fontSize:"2em",fontWeight:"bold",color:"black"}}>search by month</span>
        <input style={{marginTop:"0.3%",padding:"1%"}} type="month" value={searchMonth} onChange={handleSearch}/>
      </div>
      <div className="page-container" style={{border:"5px solid black", marginLeft:"2%", marginRight:"2%", marginBottom:"1%",marginTop:"1%"}}>
        <div className="left-half" style={{border:"1px solid black", padding:"2%"}}>
          <div>
            <h2 style={{color: 'white', textShadow: '0 0 2px black',fontSize:"3em", WebkitTextStroke: '2px black', fontWeight: 'bold' }}>Income</h2>
            <ul className="transaction-list">
              {filteredIncomeForms.map(form => (
                <div className="transaction-item" key={form._id} style={{border:"1px solid black",fontSize:"1.5em", padding:"2%", margin:"2%",backgroundColor: "rgba(128, 128, 128, 0.4)", backdropFilter:"blur(6px)", color:"black", fontWeight:"bold", fontFamily:"cursive", borderRadius:"5%"}}>
                  <p>Amount: {form.amount}</p>
                  <p>Option: {form.option}</p>
                  <p>Date: {new Date(form.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  {form.option === 'borrowed' && (
                    <p>Borrower's Name: {form.borrowerName}</p>
                  )}
                  <button style={{backgroundColor:"gray",borderRadius:"5%",border:"3px solid white"}} onClick={() => handleIncomeDelete(form._id)}>Delete</button>
                </div>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="right-half" style={{border:"1px solid black", padding:"2%"}}>
          <div>
          <h2 style={{color: 'white', textShadow: '0 0 2px black',fontSize:"3em", WebkitTextStroke: '2px black', fontWeight: 'bold' }}>Expense</h2>
            <ul className="transaction-list">
              {filteredExpenseForms.map(form => (
                <div className="transaction-item" key={form._id} style={{border:"1px solid black",fontSize:"1.5em", padding:"2%", margin:"2%",backgroundColor: "rgba(128, 128, 128, 0.4)", backdropFilter:"blur(6px)", color:"black", fontWeight:"bold", fontFamily:"cursive", borderRadius:"5%"}}>
                  <p>Amount: {form.amount}</p>
                  <p>Subject: {form.subject}</p>
                  <p>Date: {new Date(form.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <button style={{backgroundColor:"gray",borderRadius:"5%",border:"3px solid white"}} onClick={() => handleExpenseDelete(form._id)}>Delete</button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcations;
