import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navvbar = () => {
    const navigate = useNavigate();
    const handleClick=()=>{
        // clear token in cookie document
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/loginpage');

    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Dairy</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/registerpage">Register</Nav.Link>
                        <Nav.Link as={NavLink} to="/loginpage">Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/aboutus">About Us</Nav.Link>
                        <Nav.Link as={NavLink} to="/aboutwebsite">About Website</Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link as={NavLink} onClick={ handleClick} to="/loginpage">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navvbar;
