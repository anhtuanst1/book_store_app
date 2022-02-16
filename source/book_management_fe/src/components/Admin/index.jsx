import { Fragment, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { postAPICall } from '../Support/axiosMethodCalls';
import { getLogoHeaderUrl } from '../Support/getImageUrl';
import { MyLoader } from '../Support/MyLoader';
import { getUserInfo, logout } from '../Configuration/config_url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';

import {
  Nav, Navbar, Container,
  Button
} from 'react-bootstrap';

function Admin () {
    const [userLogin, setUserLogin] = useState({name: '', email: ''})
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        postAPICall(getUserInfo).then(result => {
            let dataResponse = result.data.response
            setUserLogin({name: dataResponse.name, email: dataResponse.email})
            setIsLoading(false)
        }).catch(error => {
            clearAuth()
            setIsLoading(false)
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
                            <Nav.Link href="/admin/dashboard" className={location.pathname.indexOf('dashboard') != -1 ? 'active' : ''}>Dashboard</Nav.Link>
                            <Nav.Link href="/admin/book-management" className={location.pathname.indexOf('book-management') != -1 ? 'active' : ''}>Book Management</Nav.Link>
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
            <ToastContainer />
            {/* <MyLoader isLoading={isLoading}/> */}
        </Fragment>
    )
}

export default Admin