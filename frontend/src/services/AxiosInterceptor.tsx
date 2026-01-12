import { useEffect, type ReactNode } from 'react';
import apiClient from './apiClient';
import { useApp } from '../context/AppContext';

export const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
    const { setNotification } = useApp();

    useEffect(() => {
        const resInterceptor = apiClient.interceptors.response.use(
            (response) => {
                const { message, status } = response.data;
                setNotification({
                    message: message || status,
                    status: 'success',
                });

                return response;
            },
            (error) => {
                const message = 'Server Error: Something went wrong!';
                setNotification({ message, status: 'error' });
                return Promise.reject(error);
            },
        );

        return () => apiClient.interceptors.response.eject(resInterceptor);
    }, [setNotification]);

    return <>{children}</>;
};
