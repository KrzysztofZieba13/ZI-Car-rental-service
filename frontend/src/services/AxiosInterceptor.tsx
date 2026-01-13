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
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response?.status === 401 &&
                    !originalRequest._retry &&
                    !originalRequest.url?.includes('/auth/refresh-token')
                ) {
                    originalRequest._retry = true;
                    try {
                        await apiClient.get('/auth/refresh-token');
                        return apiClient(originalRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }

                const status = error.response?.status;

                if (status?.toString().startsWith('5')) {
                    const message = 'Server Error: Something went wrong!';
                    handleNotification({ message, status: 'error' });
                } else if (status && status !== 401) {
                    handleNotification({
                        message: error.response?.data?.message,
                        status: 'error',
                    });
                }
                return Promise.reject(error);
            },
        );

        return () => apiClient.interceptors.response.eject(resInterceptor);
    }, [handleNotification]);

    return <>{children}</>;
};
