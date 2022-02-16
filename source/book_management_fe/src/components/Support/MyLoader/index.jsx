import { Fragment } from "react";
import './Loader.css';

import {
    Spinner
} from 'react-bootstrap';

export function MyLoader(props) {
    const { isLoading } = props;

    if(!isLoading) return null

    return (
        <Fragment>
            <div className="loader-container">
                <div className="loader"></div>
                <div className="modal-backdrop show"></div>
            </div>
        </Fragment>
    );
}