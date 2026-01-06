import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL: string = 'http://localhost:3000/api';

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error);
    },
);
export default apiClient;
