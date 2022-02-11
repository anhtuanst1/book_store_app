import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

function Admin () {
    return (
        <Fragment>
            Admin
            <Outlet />
        </Fragment>
    )
}

export default Admin