import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { callAPI } from '../../Support/axiosMethodCalls';
import showToast from '../../Support/showToast';
import { MyPagination } from "../../Support/MyPagination";
import { endPoints } from '../../Configuration/config_url';

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
        let dataConfig = endPoints.get_list_books
        let apiInfo = {...dataConfig, path: `${dataConfig.path}?page=${page_number}`}

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
        navigate(`update/${bookId}`)
    }

    function submitDeleteBook(bookId) {
        let dataConfig = endPoints.book_delete
        let apiInfo = {...dataConfig, path: dataConfig.path.replace('__bookId', bookId)}

        callAPI(apiInfo).then(result => {
            let dataResponse = result.data
            setAction(bookId, true)
            showToast('success', dataResponse.message)
        }).catch(error => {
            let resultError = error.response
            showToast('error', resultError.data.message)
            console.log(resultError)
        })
    }

    function submitRestoreBook(bookId) {
        let dataConfig = endPoints.book_restore
        let apiInfo = {...dataConfig, path: dataConfig.path.replace('__bookId', bookId)}

        callAPI(apiInfo).then(result => {
            let dataResponse = result.data
            setAction(bookId, false)
            showToast('success', dataResponse.message)
        }).catch(error => {
            let resultError = error.response
            showToast('error', resultError.data.message)
            console.log(resultError)
        })
    }

    function setAction(bookId, isDel) {
        let result = findBookId(bookId)
        let dataClone = listBooks.data;

        dataClone[result.index]['deleted_by'] = null
        setListBooks(
            {...listBooks, data: dataClone}
        )
        if(isDel) {
            dataClone[result.index]['deleted_by'] = 'deleted'
            setListBooks(
                {...listBooks, data: dataClone}
            )
        }
    }

    function findBookId(bookId) {
        return {
            index: listBooks.data.findIndex(({id}) => id === bookId),
            data: listBooks.data.find(({id}) => id === bookId)
        }
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
                                                                {
                                                                    (book.deleted_by == null) ?
                                                                    (
                                                                        <Button variant="danger"
                                                                        className='w-100'
                                                                        size='sm'
                                                                        onClick={() => submitDeleteBook(book.id)}>
                                                                            Delete
                                                                        </Button>
                                                                    ) : (
                                                                        <Button variant="success"
                                                                        className='w-100'
                                                                        size='sm'
                                                                        onClick={() => submitRestoreBook(book.id)}>
                                                                            Restore
                                                                        </Button>
                                                                    )
                                                                }
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