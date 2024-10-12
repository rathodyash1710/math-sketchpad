import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Authorization': `Token ${ACCESS_TOKEN()}` },
    withCredentials: true,
});

export default api;