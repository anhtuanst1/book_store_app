import axios from 'axios';
import authHeader from './authHeader';

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