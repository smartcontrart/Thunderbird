import React from "react";
import { Container, Navbar, Nav} from "react-bootstrap";
import SearchBar from "./SearchBar";
import { clearToken } from "../services/api";
import {useLocation} from 'react-router-dom'

export default function NavigationBar(props) {

  
  const userLoggedIn = props.token === "" ? false : true
  const location = useLocation()

  function renderLoginLink(){
    if (location.pathname !== '/login') {
      return userLoggedIn ? <Nav.Link href="/" onClick={logout}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>
    }
  }

  function renderCollect(){
      return userLoggedIn ? <Nav.Link href="/collect">Collect</Nav.Link> : null
  }


  function logout(){
    clearToken()
  }

  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">ThunderBird</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link href="/browse">Browse</Nav.Link>     
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>  
            {renderCollect()}
          </Nav>
          
          <Navbar.Collapse className="justify-content-end">
            <SearchBar className="justify-content-start"/>
            
            {renderLoginLink()}
          </Navbar.Collapse>    
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </React.Fragment>
  );
}
