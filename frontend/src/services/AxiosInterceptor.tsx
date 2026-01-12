import { useEffect, type ReactNode } from 'react';
import apiClient from './apiClient';
import { useApp } from '../context/AppContext';

export const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
    const { handleNotification } = useApp();

    useEffect(() => {
        const resInterceptor = apiClient.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const message = 'Server Error: Something went wrong!';
                handleNotification({ message, status: 'error' });
                return Promise.reject(error);
            },
        );

        return () => apiClient.interceptors.response.eject(resInterceptor);
    }, [handleNotification]);

    return <>{children}</>;
};
