import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { callAPI } from './Support/axiosMethodCalls';
import { MyPagination } from "./Support/MyPagination";
import { endPoints } from './Configuration/config_url';

import {
    Container, Row, Col,
    Card,
    Button
} from 'react-bootstrap';

function Home () {
    const [listBooks, setListBooks] = useState({data: [], current_page: 1, last_page: 1, per_page: 0, total: 0})
    const navigate = useNavigate()

    useEffect(() => {
        afterPageClicked(listBooks.current_page)
    }, [])

    function afterPageClicked(page_number) {
        setListBooks({...listBooks, current_page: page_number})
        let apiInfo = endPoints.get_list_books
        apiInfo.path = `${apiInfo.path}?page=${page_number}`

        callAPI(apiInfo).then(result => {
            let dataResponse = result.data.response.list_books
            setListBooks({
                ...listBooks,
                data: dataResponse.data,
                current_page: dataResponse.current_page,
                last_page: dataResponse.last_page,
                per_page: dataResponse.per_page,
                total: dataResponse.total
            })
            console.log(dataResponse)
        })
    }

    function redirectToDetail(bookId) {
        let apiInfo = endPoints.book_views
        apiInfo.path = apiInfo.path.replace('__bookId', bookId)

        callAPI(apiInfo).then(result => {
            let dataResponse = result.data.response
            console.log(dataResponse)
        })

        navigate(`book/${bookId}`)
    }

    return (
        <Fragment>
            <h3 className='show-check-layout'>Home page</h3>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={10} xl={8}>
                        <Row>
                            {
                                (listBooks.data.length != 0) ?
                                listBooks.data.map(book => {
                                    return (
                                        <Col key={book.id} sm={6} md={3} className='py-2'>
                                            <Card className='w-100'>
                                                <Card.Img variant="top" src="/images/book_default.png" />
                                                <Card.Body className='text-start'>
                                                    <Card.Title className='w-100 three-dot-1'>{book.name}</Card.Title>
                                                    <Card.Text className='w-100 three-dot-1'>
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
                    </Col>
                </Row>
                <Row>
                    <MyPagination
                        totPages={parseInt(listBooks.last_page)}
                        currentPage={listBooks.current_page}
                        pageClicked={(ele) => { afterPageClicked(ele) }}>
                    </MyPagination>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Home