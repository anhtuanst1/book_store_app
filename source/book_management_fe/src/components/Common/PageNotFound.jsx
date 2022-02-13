import { Fragment } from 'react';

import {
    Container, Row, Col,
    Figure,
    Button
} from 'react-bootstrap';

function PageNotFound () {

    return (
        <Fragment>
            <Container>
                <Row className='justify-content-center mt-5'>
                    <Col md={10} xl={8} className='text-center'>
                        <Row>
                            <Col md={6} className='mx-auto'>
                                <h1 className='font-bold'>404</h1>
                                <h3>Page Not Found</h3>
                                <p >The Page you are looking for doesn't exist or an other error occured. Go to 
                                    <Button variant="link" href='/' className='align-baseline ms-2 p-0'>Home Page</Button>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default PageNotFound