import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { getLogoHeaderUrl } from './components/Support/getImageUrl';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';

import {
  Nav, Navbar, Container,
  Button
} from 'react-bootstrap';

function App() {
  localStorage.setItem("is_admin", JSON.stringify(false))

  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={getLogoHeaderUrl()}
              width="30"
              height="30"
              className="d-inline-block align-top me-3"
            />{' '}
            Book Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Nav>
              <Nav.Link href="/login">
                <Button size="sm">Login</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="App">
        <h3 className='show-check-layout'>App layout</h3>
        <Outlet />
      </div>
      <ToastContainer />
    </Fragment>
  )
}

export default App;
