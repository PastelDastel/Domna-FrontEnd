import axios from 'axios';
const BASE_URL = 'https://1edf17b2-a202-47d1-94db-4087c4ce79af.eu-central-1.cloud.genez.io';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});