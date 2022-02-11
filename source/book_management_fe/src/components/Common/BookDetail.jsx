import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAPICall } from '../Datalayer/axiosMethodCalls';
import { getBookDetail } from '../Configuration/config_url';

import {
    Container, Row, Col,
    Figure,
    Button
} from 'react-bootstrap';

function BookDetail () {
    const [bookInfo, setBookInfo] = useState({data: []})
    const param = useParams()

    useEffect(() => {
        getAPICall(getBookDetail.replace('__bookId', param.bookId)).then(result => {
            let dataResponse = result.data.response
            setBookInfo({
                ...bookInfo,
                data: dataResponse.book_info
            })
        })
    }, [])

    return (
        <Fragment>
            <h3 className='show-check-layout'>Book Detail</h3>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={6}>
                        <Button className='float-start mb-3' href="/">Back</Button>
                        <Figure>
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="171x180"
                                src="/images/book_default.png"
                            />
                            <Figure.Caption>
                                <h1>{bookInfo.data.name}</h1>
                                <p>{bookInfo.data.description}</p>
                                <Row>
                                    <Col>
                                        <p className='text-end'><strong>Date Create: </strong>{bookInfo.data.created_at}</p>
                                    </Col>
                                </Row>
                                <p className='text-start'>{bookInfo.data.content}</p>
                            </Figure.Caption>
                        </Figure>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default BookDetail