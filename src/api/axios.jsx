import axios from 'axios';
const BASE_URL = 'https://www.backend.domna.net';
// http://localhost:3500
export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
}); 