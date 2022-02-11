import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

function BookManagements () {
    return (
        <Fragment>
            Book Managements
            <Outlet />
        </Fragment>
    )
}

export default BookManagements