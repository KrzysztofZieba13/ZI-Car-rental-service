import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL: string = import.meta.env.VITE_SERVER_URL + 'api';

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
        return Promise.reject(error);
    },
);
export default apiClient;
