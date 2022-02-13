import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAPICall } from '../../Support/axiosMethodCalls';
import { MyPagination } from "../../Support/MyPagination";
import { getListBooks } from '../../Configuration/config_url';

import {
    Container, Row, Col,
    Table,
    Button
} from 'react-bootstrap';

function BookManagement () {
    const [listBooks, setListBooks] = useState({data: [], current_page: 1, last_page: 1, per_page: 0, total: 0})
    const navigate = useNavigate()

    useEffect(() => {
        afterPageClicked(listBooks.current_page)
    }, [])

    function afterPageClicked(page_number) {
        setListBooks({...listBooks, current_page: page_number})
        getAPICall(`${getListBooks}?page=${page_number}`).then(result => {
            let dataResponse = result.data.response.list_books
            setListBooks({
                ...listBooks,
                data: dataResponse.data,
                current_page: dataResponse.current_page,
                last_page: dataResponse.last_page,
                per_page: dataResponse.per_page,
                total: dataResponse.total
            })
        })
    }

    function redirectToDetail(bookId) {
        navigate(`update/${bookId}`)
    }

    return (
        <Fragment>
            <h3 className='mb-4'>Books List</h3>
            <Container>
                <Row className='mb-3'>
                    <Col>
                        <Button className='float-end' href="/admin/book-management/create">Create</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Views</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (listBooks.data.length != 0) ?
                                    listBooks.data.map((book, key) => {
                                        return (
                                            <tr key={book.id}>
                                                <td>{key+1}</td>
                                                <td className='text-start'>{book.name}</td>
                                                <td className='text-start'>{book.description}</td>
                                                <td>{book.price}</td>
                                                <td>{book.views}</td>
                                                <td>
                                                        <Row className='mx-auto'>
                                                            <Col lg={6} className='mb-2 mb-lg-0'>
                                                                <Button variant="primary"
                                                                className='w-100'
                                                                size='sm'
                                                                onClick={() => redirectToDetail(book.id)}>
                                                                    Edit
                                                                </Button>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Button variant="danger"
                                                                className='w-100'
                                                                size='sm'
                                                                onClick={() => redirectToDetail(book.id)}>
                                                                    Delete
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                </td>
                                            </tr>
                                        )
                                    }) : <tr><td colSpan={6}>No data</td></tr>
                                }
                            </tbody>
                        </Table>
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

export default BookManagement