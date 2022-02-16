import axios from 'axios';
import authHeader from './authHeader';
import { domainEndPoint } from '../Configuration/config_url';

export const callAPI = (endPointInfo, data) => {
    if(!endPointInfo.method || !endPointInfo.path) {
        return false
    }

    let url = domainEndPoint + endPointInfo.path
    switch (endPointInfo.method) {
        case 'get':
            return getAPICall(url);
            break;
        case 'post':
            return postAPICall(url, data);
            break;
        case 'put':
            return putAPICall(url, data);
            break;
        case 'delete':
            return deleteAPICall(url);
            break;
    }
}

// API Axios Get Call.
export const getAPICall = (url) => {
    return axios.get(url, { headers: authHeader() });
}

// API Axios Post Call.
export const postAPICall = (url, data) => {
    return axios.post(url, data, { headers: authHeader() });
}

// API Axios Put Call.
export const putAPICall = (url, data) => {
    return axios.put(url, data, { headers: authHeader() });
}

// API Axios Delete Call.
export const deleteAPICall = (url) => {
    return axios.delete(url, { headers: authHeader() });
}