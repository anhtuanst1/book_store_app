import { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postAPICall } from '../../Support/axiosMethodCalls';
import showToast from '../../Support/showToast';
import { createBook } from '../../Configuration/config_url';

import {
    Container, Row, Col,
    Card, Form, Button
} from 'react-bootstrap';

function BookCreate () {
    const [dataCreate, setDataCreate] = useState({name: '', price: 0, description: '', content: ''})
    const param = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        //
    }, [])

    function submitCreate() {
        postAPICall(createBook, dataCreate).then(result => {
            let dataResponse = result.data
            showToast('success', dataResponse.message)
            navigate('/admin/book-management')
        }).catch(error => {
            let resultError = error.response
            showToast('error', resultError.data.message)
            console.log(resultError)
        })
    }

    return (
        <Fragment>
            <h3 className='mb-4'>{`Create Book ${param.bookId}`}</h3>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8} lg={7} xl={6}>
                        <Row className='mb-3'>
                            <Col>
                                <Button className='float-start' href="/admin/book-management">Back</Button>
                            </Col>
                        </Row>
                        <Card>
                            <Card.Header as="h5" className='text-start'>Create Form</Card.Header>
                            <Card.Body className='text-start'>
                                <Form>
                                    <Form.Group className="mb-2" controlId="formBasicName">
                                        <Form.Label className='mb-1'>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name"
                                            maxLength={100}
                                            value={dataCreate.name}
                                            onChange={e => setDataCreate({...dataCreate, name: e.target.value})} />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicPrice">
                                        <Form.Label className='mb-1'>Price</Form.Label>
                                        <Form.Control type="number" placeholder="Enter price"
                                            maxLength={7}
                                            value={dataCreate.price}
                                            onChange={e => setDataCreate({...dataCreate, price: e.target.value})} />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicDescription">
                                        <Form.Label className='mb-1'>Description</Form.Label>
                                        <Form.Control type="text" placeholder="Enter description"
                                            maxLength={255}
                                            value={dataCreate.description}
                                            onChange={e => setDataCreate({...dataCreate, description: e.target.value})} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasiContent">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter content"
                                            value={dataCreate.content}
                                            onChange={e => setDataCreate({...dataCreate, content: e.target.value})} />
                                    </Form.Group>

                                    <Button variant="primary" type="button" className='mt-3' onClick={() => submitCreate()}>
                                        Create
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

export default BookCreate