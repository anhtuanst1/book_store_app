import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAPICall } from './Support/axiosMethodCalls';
import { doLogin } from './Configuration/config_url';

import {
    Container, Row, Col,
    Card, Form, Button
} from 'react-bootstrap';

function Login () {
    const [loginInfo, setLoginInfo] = useState({email: '', password: '', remember: false})
    const [errorInfo, setErrorInfo] = useState({is_show: false, message: ''})
    const [errorEmailInfo, setErrorEmailInfo] = useState({is_show: false, message: ''})
    const [errorPasswordInfo, setErrorPasswordInfo] = useState({is_show: false, message: ''})
    const navigate = useNavigate()

    useEffect(() => {
        
    }, [])

    function submitLogin() {
        postAPICall(doLogin, loginInfo).then(result => {
            clearError()
            console.log('login success ', result)
        }).catch(error => {
            clearError()
            let resultError = error.response.data
            if (error.response) {
                if(resultError.response) {
                    showError(resultError.response)
                } else {
                    setErrorInfo({is_show: true, message: resultError.message})
                }
            }
        })
    }

    function showError(error) {
        if(error.email) {
            setErrorEmailInfo({is_show: true, message: error.email})
        }

        if(error.password) {
            setErrorPasswordInfo({is_show: true, message: error.password})
        }
    }

    function clearError() {
        let dataClear = {is_show: false, message: ''}
        setErrorEmailInfo(dataClear)
        setErrorPasswordInfo(dataClear)
        setErrorInfo(dataClear)
    }

    return (
        <Fragment>
            <h3 className='show-check-layout'>Login page</h3>
            <Container>
                <Row className='justify-content-center text-start'>
                    <Col md={7} lg={6} xl={5}>
                        <Card>
                            <Card.Header as="h5">Login</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email"
                                            value={loginInfo.email}
                                            onChange={e => setLoginInfo({...loginInfo, email: e.target.value})} />
                                        {
                                            errorEmailInfo.is_show ?
                                            (
                                                <Form.Text className="text-danger">{errorEmailInfo.message}</Form.Text>
                                            ) : ''
                                        }
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password"
                                            value={loginInfo.password}
                                            onChange={e => setLoginInfo({...loginInfo, password: e.target.value})} />
                                        {
                                            errorPasswordInfo.is_show ?
                                            (
                                                <Form.Text className="text-danger">{errorPasswordInfo.message}</Form.Text>
                                            ) : ''
                                        }
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me"
                                            value={loginInfo.remember}
                                            onChange={e => setLoginInfo({...loginInfo, remember: e.target.checked})} />
                                    </Form.Group>
                                    
                                    {
                                        errorInfo.is_show ?
                                        (
                                            <Form.Group className="mb-3">
                                                <Form.Text className="text-danger">{errorInfo.message}</Form.Text>
                                            </Form.Group>
                                        ) : ''
                                    }

                                    <Button variant="primary" type="button" onClick={() => submitLogin()}>
                                        Login
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Login