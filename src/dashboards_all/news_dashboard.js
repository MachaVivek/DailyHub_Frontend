import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Routes} from "react-router-dom";

import Aboutnews from "../news_components/aboutnews"
import Headlines from "../news_components/headlines"
import Readnews from "../news_components/readnews"
import Viewnews from "../news_components/viewnews"

const NewsDashboard = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container>
            <Navbar.Brand href="/newsdashboard/headlines">Headlines</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/newsdashboard/readnews">Read news</Nav.Link>
                    {/* <Nav.Link href="/newsdashboard/viewnews">view news</Nav.Link> */}
                <Nav.Link href="/newsdashboard/aboutstory">About this</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/headlines" element={<Headlines />}/>
            <Route path="/readnews" element={<Readnews />}/>
            <Route path="/viewnews/:id" element={<Viewnews />}/>
            <Route path="/aboutstory" element={<Aboutnews />}/>
        </Routes>
        </div>

    )
}
export default NewsDashboard