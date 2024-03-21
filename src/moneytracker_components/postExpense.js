// ExpenseForm.js

import React, { useState } from 'react';
import axios from 'axios';
import moneytracker_background from "../images/moneytracker_background.jpg";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    subject: '',
    option: '',
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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/postexpense`, formData);
      console.log(response.data);
      // Reset form after successful submission
      setFormData({
        amount: '',
        subject: '',
        option: '',
        date: ''
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Expense submission failed:', error);
    }
  };

  return (
    <div className="neumorphic-form-containerexp" style={{ backgroundImage: `url(${moneytracker_background})` ,height: "88vh", backgroundSize: "cover", backgroundPosition: "center" }}>
      
    <form onSubmit={handleSubmit} className="neumorphic-formexp">
    <div style={{ textAlign: 'center'}}>
      <br></br>
    <h3 className="neumorphic-label">Expense Form</h3>
    </div>
    <br></br>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="neumorphic-input" required/>
      </div>
      <div>
      <label htmlFor="subject">Subject:</label>
      <textarea id="subject" name="subject" rows="3" value={formData.subject} onChange={handleChange} className="neumorphic-textarea" required></textarea>
    </div>
      <div>
      <label>Select the type of expense</label>
      <div class="radio-container" >
        <div>
          <input type="radio" id="education" name="option" value="education" checked={formData.option === 'education'} onChange={handleChange} className="neumorphic-radio" required/>
          <label htmlFor="education"  className="neumorphic-label">Education</label>
        </div>
        <div>
          <input type="radio" id="food" name="option" value="food" checked={formData.option === 'food'} onChange={handleChange}className="neumorphic-radio" />
          <label htmlFor="food"  className="neumorphic-label">Food</label >
        </div>
        <div>
          <input type="radio" id="grocery" name="option" value="grocery" checked={formData.option === 'grocery'} onChange={handleChange} className="neumorphic-radio"/>
          <label htmlFor="grocery"  className="neumorphic-label">Grocery</label>
        </div>
        <div>
          <input type="radio" id="health" name="option" value="health" checked={formData.option === 'health'} onChange={handleChange} className="neumorphic-radio"/>
          <label htmlFor="health"  className="neumorphic-label">Health</label>
        </div>
        <div>
          <input type="radio" id="travel" name="option" value="travel" checked={formData.option === 'travel'} onChange={handleChange} className="neumorphic-radio"/>
          <label htmlFor="travel"  className="neumorphic-label">Travel</label>
        </div>
        <div>
          <input type="radio" id="entertainment" name="option" value="entertainment" checked={formData.option === 'entertainment'} onChange={handleChange} className="neumorphic-radio"/>
          <label htmlFor="entertainment"  className="neumorphic-label">Entertainment</label>
        </div>
        <div>
          <input type="radio" id="gifts" name="option" value="gifts" checked={formData.option === 'gifts'} onChange={handleChange} className="neumorphic-radio"/>
          <label htmlFor="gifts"  className="neumorphic-label">Gifts</label>
        </div>
        <div>
          <input type="radio" id="debt_given" name="option" value="debt_given" checked={formData.option === 'debt_given'} onChange={handleChange} className="neumorphic-radio"/>
          <label htmlFor="gifts"  className="neumorphic-label">Debt Given to someone</label>
        </div>
        <div>
          <input type="radio" id="other" name="option" value="other" checked={formData.option === 'other'} onChange={handleChange} className="neumorphic-radio"/>
          <label htmlFor="other"  className="neumorphic-label">Other</label>
        </div>
        </div>
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="neumorphic-input" required/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
      <button type="submit" className="neumorphic-button">Submit Expense</button>
      </div>
    </form>
    </div>
  );
};

export default ExpenseForm;
