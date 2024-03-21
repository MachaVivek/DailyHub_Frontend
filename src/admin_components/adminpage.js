import React ,{useState, useEffect} from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Routes} from "react-router-dom";

import Storyupload from "../story_components/upload_story_file"
import Uploadnews from "../news_components/uploadnews"
const Adminpage= ()=>{
    return(
        <div>
            {
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
              <Container>
              <Navbar.Brand href="/adminpage">Admin</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link href="/adminpage/uploadstory">upload story</Nav.Link>
                      <Nav.Link href="/adminpage/uploadnews">upload news</Nav.Link>
                  </Nav>
                  <Nav>
                  <Nav.Link href="/adminpage/">Logout</Nav.Link>
                  </Nav>
              </Navbar.Collapse>
              </Container>
          </Navbar>
        }
        <Routes>
            <Route path="/uploadstory" element={<Storyupload />}/>
            <Route path="/uploadnews" element={<Uploadnews />}/>
        </Routes>
        </div>
    )
}
export default Adminpage