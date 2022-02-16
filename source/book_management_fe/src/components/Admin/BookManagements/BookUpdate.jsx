import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { callAPI } from '../../Support/axiosMethodCalls';
import showToast from '../../Support/showToast';
import { endPoints } from '../../Configuration/config_url';

import {
    Container, Row, Col,
    Card, Form, Button
} from 'react-bootstrap';

function BookUpdate () {
    const [dataUpdate, setDataUpdate] = useState({name: '', price: 0, description: '', content: ''})
    const param = useParams()

    useEffect(() => {
        let dataConfig = endPoints.get_book_detail
        let apiInfo = {...dataConfig, path: dataConfig.path.replace('__bookId', param.bookId)}

        callAPI(apiInfo).then(result => {
            let dataResponse = result.data.response
            setDataUpdate({
                name: dataResponse.book_info.name,
                price: dataResponse.book_info.price,
                description: dataResponse.book_info.description,
                content: dataResponse.book_info.content
            })
        })
    }, [])

    function submitUpdate() {
        let dataConfig = endPoints.book_update
        let apiInfo = {...dataConfig, path: dataConfig.path.replace('__bookId', param.bookId)}

        callAPI(apiInfo, dataUpdate).then(result => {
            let dataResponse = result.data
            showToast('success', dataResponse.message)
        }).catch(error => {
            let resultError = error.response
            showToast('error', resultError.data.message)
            console.log(resultError)
        })
    }

    return (
        <Fragment>
            <h3 className='mb-4'>{`Update Book ${param.bookId}`}</h3>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8} lg={7} xl={6}>
                        <Row className='mb-3'>
                            <Col>
                                <Button className='float-start' href="/admin/book-management">Back</Button>
                            </Col>
                        </Row>
                        <Card>
                            <Card.Header as="h5" className='text-start'>Update Form</Card.Header>
                            <Card.Body className='text-start'>
                                <Form>
                                    <Form.Group className="mb-2" controlId="formBasicName">
                                        <Form.Label className='mb-1'>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name"
                                            maxLength={100}
                                            value={dataUpdate.name}
                                            onChange={e => setDataUpdate({...dataUpdate, name: e.target.value})} />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicPrice">
                                        <Form.Label className='mb-1'>Price</Form.Label>
                                        <Form.Control type="number" placeholder="Enter price"
                                            maxLength={7}
                                            value={dataUpdate.price}
                                            onChange={e => setDataUpdate({...dataUpdate, price: e.target.value})} />
                                    </Form.Group>

                                    <Form.Group className="mb-2" controlId="formBasicDescription">
                                        <Form.Label className='mb-1'>Description</Form.Label>
                                        <Form.Control type="text" placeholder="Enter description"
                                            maxLength={255}
                                            value={dataUpdate.description}
                                            onChange={e => setDataUpdate({...dataUpdate, description: e.target.value})} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasiContent">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter content"
                                            value={dataUpdate.content}
                                            onChange={e => setDataUpdate({...dataUpdate, content: e.target.value})} />
                                    </Form.Group>

                                    <Button variant="primary" type="button" className='mt-3' onClick={() => submitUpdate()}>
                                        Update
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

export default BookUpdate