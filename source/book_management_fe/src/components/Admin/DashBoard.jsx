import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAPICall } from '../Support/axiosMethodCalls';
import { getListBooksByView } from '../Configuration/config_url';

import {
    Container, Row, Col,
    Card,
    Button
} from 'react-bootstrap';

function DashBoard () {
    const [listBooks, setListBooks] = useState({data: []})
    const navigate = useNavigate()

    useEffect(() => {
        postAPICall(getListBooksByView).then(result => {
            let dataResponse = result.data.response.list_books_by_view
            setListBooks({
                data: dataResponse
            })
        })
    }, [])

    function redirectToDetail(bookId) {
        navigate(`book/${bookId}`)
    }

    return (
        <Fragment>
            <h3 className='mb-4'>Dashboard</h3>
            <Container>
                <Row>
                    {
                        (listBooks.data.length != 0) ?
                        listBooks.data.map(book => {
                            return (book.views > 0) ? (
                                <Col key={book.id} sm={6} md={4} xl={3} className='py-2'>
                                    <Card className='w-100'>
                                        <Card.Img variant="top" src="/images/book_default.png" />
                                        <Card.Body className='text-start'>
                                            <Card.Title>{book.name}</Card.Title>
                                            <Card.Text className='w-100 three-dot-1'>
                                                {book.description}
                                            </Card.Text>
                                            <Card.Text className='w-100 text-end'>
                                                {`${book.views} views`}
                                            </Card.Text>
                                            {/* <Button variant="primary" onClick={() => redirectToDetail(book.id)}>Read</Button> */}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ) : ''
                        }) : ''
                    }
                </Row>
            </Container>
        </Fragment>
    )
}

export default DashBoard