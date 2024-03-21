import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

import MoneyDashboard from '../moneytracker_components/etrackerdashboard.js';
import Transcations from '../moneytracker_components/etranscations.js';
import ExpenseForm from '../moneytracker_components/postExpense.js';
import IncomeForm from '../moneytracker_components/postIncome.js';

const MoneytrackerDashboard = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container>
            <Navbar.Brand href="/moneytrackerdashboard/moneydashboard">Finance Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/moneytrackerdashboard/transcationspage">E-transcations</Nav.Link>
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
            <Route path="/moneydashboard" element={<MoneyDashboard />}/>
            <Route path="/transcationspage" element={<Transcations />}/>
            <Route path="/expenseform" element={<ExpenseForm />}/>
            <Route path="/incomeform" element={<IncomeForm />}/>
        </Routes>
        </>
    )
}
export default MoneytrackerDashboard