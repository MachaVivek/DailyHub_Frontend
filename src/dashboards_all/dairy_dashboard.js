import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Routes} from "react-router-dom";

import Viewpic from "../dairy_components/viewpic"
import Picupload from "../dairy_components/picupload"
import Story from "../dairy_components/story"
import Fdish from "../dairy_components/fdish"
import Dailyd from "../dairy_components/dailydairy"
import Fpeople from "../dairy_components/fpeople"
import Fplace from "../dairy_components/fplaces"
const DairyDashboard = () => {
    return (
        <div style={{backgroundColor:"lightgrey"}}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container>
            <Navbar.Brand href="/dairydashboard">Dairy Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/dairydashboard/dailydairy">write Dairy</Nav.Link>
                    <Nav.Link href="/dairydashboard/favoriteplaces">Favorite places</Nav.Link>
                    <Nav.Link href="/dairydashboard/favoritefood">favorite food</Nav.Link>
                    <Nav.Link href="/dairydashboard/favoritepeople">favorite people</Nav.Link>
                    <Nav.Link href="/dairydashboard/favoritestory">Favorite incident</Nav.Link>
                    <Nav.Link href="/dairydashboard/picupload">images upload</Nav.Link>
                    <Nav.Link href="/dairydashboard/viewphoto">view memories</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/dailydairy" element={<Dailyd />}/>
            <Route path="/favoriteplaces" element={<Fplace />}/>
            <Route path="/favoritefood" element={<Fdish />}/>
            <Route path="/favoritepeople" element={<Fpeople />}/>
            <Route path="/favoritestory" element={<Story />}/>
            <Route path="/picupload" element={<Picupload />}/>
            <Route path="/viewphoto" element={<Viewpic />}/>
        </Routes>
            
        </div>
    )
}
export default DairyDashboard