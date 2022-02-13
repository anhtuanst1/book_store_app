import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

function BookManagements () {
    return (
        <Fragment>
            <h3 className='show-check-layout'>Book Managements</h3>
            <Outlet />
        </Fragment>
    )
}

export default BookManagements