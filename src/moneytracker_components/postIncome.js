// components/Form.js

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "./moneyTrackerComponents.css";
import moneytracker_background from "../images/moneytracker_background.jpg";
import { useNavigate } from 'react-router';
const IncomeForm = ({userId}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    option: '',
    borrowerName: '',
    borrowerPhoneNumber: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        userId
      };
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/postincome`, dataToSend);
      console.log(response.data);
      // Reset form after successful submission
      setFormData({
        amount: '',
        option: '',
        borrowerName: '',
        borrowerPhoneNumber: '',
        date: ''
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <div className="neumorphic-form-container" style={{ backgroundImage: `url(${moneytracker_background})` ,height: "100vh", backgroundSize: "cover", backgroundPosition: "center" }}>

    <form onSubmit={handleSubmit} className="neumorphic-form">
      <div style={{ textAlign: 'center'}}>
    <h3 className="neumorphic-label">Income Form</h3>
    </div>
    <br></br>

    <label>
      Amount:
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="neumorphic-input" required/>
    </label>
    <br></br>
    <br></br>
    <label>Select the type of income</label>
    <div >
    <div>
      <input type="radio" id="borrowed" name="option" value="borrowed" checked={formData.option === 'borrowed'} onChange={handleChange} className="neumorphic-radio" />
      <label htmlFor="borrowed" className="neumorphic-label" >Borrowed</label>
    </div>
    <div>
      <input type="radio" id="salary" name="option" value="salary" checked={formData.option === 'salary'} onChange={handleChange} className="neumorphic-radio" />
      <label htmlFor="salary" className="neumorphic-label" required>Salary</label>
    </div>
    <div>
      <input type="radio" id="business" name="option" value="business" checked={formData.option === 'business'} onChange={handleChange} className="neumorphic-radio" />
      <label htmlFor="business" className="neumorphic-label">Business</label>
    </div>
    <div>
      <input type="radio" id="gifts" name="option" value="gifts" checked={formData.option === 'gifts'} onChange={handleChange} className="neumorphic-radio" />
      <label htmlFor="gifts" className="neumorphic-label">Gifts</label>
    </div>
    </div>
    {formData.option === 'borrowed' && (
      <div>
        <label>
          Borrower's Name:
          <input type="text" name="borrowerName" value={formData.borrowerName} onChange={handleChange} className="neumorphic-input" />
        </label>
        <br></br>
        <label>
          Borrower's Phone Number:
          <input type="tel" name="borrowerPhoneNumber" value={formData.borrowerPhoneNumber} onChange={handleChange} className="neumorphic-input" />
        </label>
        <br></br>
      </div>
    )}
    <label>
      Date:
      <input type="date" name="date" value={formData.date} onChange={handleChange} className="neumorphic-input" required/>
    </label>
    <br></br>
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <button  type="submit" className="neumorphic-button">Submit</button>
    </div>
  </form>
  </div>
  );
};

export default IncomeForm;
