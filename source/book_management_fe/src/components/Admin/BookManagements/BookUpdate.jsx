import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAPICall, postAPICall } from '../../Support/axiosMethodCalls';
import { AlertCommon } from '../../Support/AlertCommon';
import { getBookDetail, updateBook, deleteBook } from '../../Configuration/config_url';

import {
    Container, Row, Col,
    Card, Form, Button
} from 'react-bootstrap';

function BookUpdate () {
    const [dataUpdate, setDataUpdate] = useState({name: '', price: 0, description: '', content: ''})
    const [alertInfo, setAlertInfo] = useState({is_show: false, alert_type: 'success', message: ''})
    const param = useParams()

    useEffect(() => {
        getAPICall(getBookDetail.replace('__bookId', param.bookId)).then(result => {
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
        postAPICall(updateBook.replace('__bookId', param.bookId), dataUpdate).then(result => {
            let dataResponse = result.data
            setAlertInfo({is_show: true, alert_type: 'success', message: dataResponse.message})
        }).catch(error => {
            let resultError = error.response
            console.log(resultError)
            setAlertInfo({is_show: true, alert_type: 'danger', message: resultError.data.message})
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
                                    <AlertCommon
                                        isShow={alertInfo.is_show}
                                        alertType={alertInfo.alert_type}
                                        message={alertInfo.message}>
                                    </AlertCommon>
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