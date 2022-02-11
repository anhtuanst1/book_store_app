import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPICall } from '../Datalayer/axiosMethodCalls';
import { getListBooks } from '../Configuration/config_url';

import {
    Container, Row, Col,
    Card,
    Button
} from 'react-bootstrap';

function Home () {
    const [listBooks, setListBooks] = useState({data: [], current_page: 1, per_page: 0, total: 0})
    const navigate = useNavigate()

    useEffect(() => {
        getAPICall(getListBooks).then(result => {
            let dataResponse = result.data.response.list_books
            setListBooks({
                ...listBooks,
                data: dataResponse.data,
                current_page: dataResponse.current_page,
                per_page: dataResponse.per_page,
                total: dataResponse.total
            })
        })
    }, [])

    function redirectToDetail(bookId) {
        navigate(`book/${bookId}`)
    }

    return (
        <Fragment>
            <h3 className='show-check-layout'>Home page</h3>
            <Container>
                <Row>
                    {
                        (listBooks.data.length != 0) ?
                        listBooks.data.map(book => {
                            return (
                                <Col key={book.id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src="/images/book_default.png" />
                                        <Card.Body>
                                            <Card.Title>{book.name}</Card.Title>
                                            <Card.Text className='three-dot-2'>
                                                {book.description}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => redirectToDetail(book.id)}>Read</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }) : <h3>No data</h3>
                    }
                </Row>
            </Container>
        </Fragment>
    )
}

export default Home