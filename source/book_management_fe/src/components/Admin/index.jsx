import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { postAPICall } from '../Support/axiosMethodCalls';
import { logout } from '../Configuration/config_url';
import '../../App.css';

import {
  Nav, Navbar, Container,
  Button
} from 'react-bootstrap';

function Admin () {
    function doLogout() {
        postAPICall(logout).then(result => {
            let dataResponse = result
            console.log(dataResponse)
        }).catch(error => {
            let resultError = error.response
            console.log(error.response)
        })
    }

    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
                <Container>
                <Navbar.Brand href="/admin">
                    <img
                    alt=""
                    src="../images/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top me-3"
                    />{' '}
                    Book Store
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/admin/book-management">Book Management</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={() => doLogout()}>
                            <Button size="sm">Logout</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="App">
                <h3 className='show-check-layout'>Admin</h3>
                <Outlet />
            </div>
        </Fragment>
    )
}

export default Admin