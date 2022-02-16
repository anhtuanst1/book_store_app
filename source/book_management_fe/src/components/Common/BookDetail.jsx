import { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { callAPI } from '../Support/axiosMethodCalls';
import showToast from '../Support/showToast';
import { endPoints } from '../Configuration/config_url';

import {
    Container, Row, Col,
    Figure,
    Button
} from 'react-bootstrap';

function BookDetail () {
    const [bookInfo, setBookInfo] = useState({data: []})
    const param = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        let dataConfig = endPoints.get_book_detail
        let apiInfo = {...dataConfig, path: dataConfig.path.replace('__bookId', param.bookId)}

        callAPI(apiInfo).then(result => {
            let dataResponse = result.data.response
            setBookInfo({
                ...bookInfo,
                data: dataResponse.book_info
            })
        }).catch(error => {
            let resultError = error.response
            showToast('error', resultError.data.message)
            navigate('/page-not-found')
        })
    }, [])

    return (
        <Fragment>
            <h3 className='show-check-layout'>Book Detail</h3>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={6}>
                        <Row className='mb-3'>
                            <Col>
                                <Button className='float-start' href="/">Back</Button>
                            </Col>
                        </Row>
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