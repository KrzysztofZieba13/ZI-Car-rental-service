import ApiClient from './apiClient.ts';

export const createCar = async (formData: FormData) => {
    const res = await ApiClient.post('/cars', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};
