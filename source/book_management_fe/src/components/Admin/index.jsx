import { Fragment, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { postAPICall } from '../Support/axiosMethodCalls';
import { getLogoHeaderUrl } from '../Support/getImageUrl';
import { getUserInfo, logout } from '../Configuration/config_url';
import '../../App.css';

import {
  Nav, Navbar, Container,
  Button
} from 'react-bootstrap';

function Admin () {
    const [userLogin, setUserLogin] = useState({name: '', email: ''})
    const navigate = useNavigate()

    useEffect(() => {
        postAPICall(getUserInfo).then(result => {
            let dataResponse = result.data.response
            setUserLogin({name: dataResponse.name, email: dataResponse.email})
        }).catch(error => {
            clearAuth()
        })
    }, [])

    function doLogout() {
        postAPICall(logout).then(result => {
            clearAuth()
        }).catch(error => {
            let resultError = error.response
            console.log(error.response)
        })
    }

    function clearAuth() {
        localStorage.removeItem('data_login')
        navigate('/')
    }

    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand href="/admin">
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
                            <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/admin/book-management">Book Management</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link>{userLogin.name.charAt(0).toUpperCase() + userLogin.name.slice(1).toLowerCase()}</Nav.Link>
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