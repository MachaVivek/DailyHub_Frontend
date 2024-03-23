// import React,{ useEffect, useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router';

// import MoneyDashboard from '../moneytracker_components/etrackerdashboard.js';
// import Transcations from '../moneytracker_components/etranscations.js';
// import ExpenseForm from '../moneytracker_components/postExpense.js';
// import IncomeForm from '../moneytracker_components/postIncome.js';

// const MoneytrackerDashboard = () => {
  
//     const [userId, setUserId] = useState(null);
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);
//     useEffect(() => {
//         const fetchUserData = async () => {
//           try {
//             const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
//             if (!token) {
//               alert('Please login first');
//               navigate('/loginpage');
//               return;
//             }
//             const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
//               headers: { Authorization: `Bearer ${token}` }
//             });
//             setUserData(response.data)
//             const { userId } = response.data.userData;
//             console.log(userId);
//             setUserId(userId);
//           } catch (error) {
//             console.error('Failed to fetch user data:', error);
//             navigate('/loginpage');
//             // Clear the token in the document cookie
//             document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
//           }
//         };
    
//         fetchUserData();
//       }, []);
//     return (
//         <>
//             <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
//             <Container>
//             <Navbar.Brand href="/moneytrackerdashboard/moneydashboard">Finance Dashboard</Navbar.Brand>
//             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//             <Navbar.Collapse id="responsive-navbar-nav">
//                 <Nav className="me-auto">
//                     <Nav.Link href="/moneytrackerdashboard/transcationspage">E-transcations</Nav.Link>
//                     <Nav.Link href="/moneytrackerdashboard/expenseform">Expense form</Nav.Link>
//                     <Nav.Link href="/moneytrackerdashboard/incomeform">Income form</Nav.Link>
//                 </Nav>
//                 <Nav>
//                 <Nav.Link href="/dashboard">Dashboard</Nav.Link>
//                 </Nav>
//             </Navbar.Collapse>
//             </Container>
//         </Navbar>

//         <Routes>
//           <Route path="/moneydashboard" element={<MoneyDashboard userId={userId} />} />
//           <Route path="/transcationspage" element={<Transcations userId={userId} />} />
//           <Route path="/expenseform" element={<ExpenseForm userId={userId} />} />
//           <Route path="/incomeform" element={<IncomeForm userId={userId} />} />
//         </Routes>
//         </>
//     )
// }
// export default MoneytrackerDashboard


/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import MoneyDashboard from '../moneytracker_components/etrackerdashboard.js';
import Transcations from '../moneytracker_components/etranscations.js';
import ExpenseForm from '../moneytracker_components/postExpense.js';
import IncomeForm from '../moneytracker_components/postIncome.js';

const MoneytrackerDashboard = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/moneytrackerdashboard/moneydashboard">Finance Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/moneytrackerdashboard/transcationspage">E-transactions</Nav.Link>
              <Nav.Link href="/moneytrackerdashboard/expenseform">Expense form</Nav.Link>
              <Nav.Link href="/moneytrackerdashboard/incomeform">Income form</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/moneydashboard" element={<MoneyDashboard userId={userId} />} />
        <Route path="/transcationspage" element={<Transcations userId={userId} />} />
        <Route path="/expenseform" element={<ExpenseForm userId={userId} />} />
        <Route path="/incomeform" element={<IncomeForm userId={userId} />} />
      </Routes>
    </>
  );
};

export default MoneytrackerDashboard;
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import MoneyDashboard from '../moneytracker_components/etrackerdashboard.js';
import Transcations from '../moneytracker_components/etranscations.js';
import ExpenseForm from '../moneytracker_components/postExpense.js';
import IncomeForm from '../moneytracker_components/postIncome.js';

const MoneytrackerDashboard = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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
  }, [navigate]); // Add navigate to the dependencies array

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/moneytrackerdashboard/moneydashboard">Finance Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/moneytrackerdashboard/transcationspage">E-transactions</Nav.Link>
              <Nav.Link href="/moneytrackerdashboard/expenseform">Expense form</Nav.Link>
              <Nav.Link href="/moneytrackerdashboard/incomeform">Income form</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/moneydashboard" element={<MoneyDashboard />} />
        <Route path="/transcationspage" element={<Transcations />} />
        <Route path="/expenseform" element={<ExpenseForm userId={userId} />} />
        <Route path="/incomeform" element={<IncomeForm userId={userId} />} />
      </Routes>
    </>
  );
};

export default MoneytrackerDashboard;
