import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Routes} from "react-router-dom";

import StoryCards from "../story_components/view_all_story_files"
import Storyupload from "../story_components/upload_story_file"
import ViewFormDetails from "../story_components/read_story_file"
const StoryDashboard = () => {
    return (
        <div style={{backgroundColor: "#708328"}}>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/storydashboard/allstories">story book</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/allstories" element={<StoryCards />}/>
            <Route path="/viewstory/:id" element={<ViewFormDetails />}/>
        </Routes>
        </div>
    )
}
export default StoryDashboard