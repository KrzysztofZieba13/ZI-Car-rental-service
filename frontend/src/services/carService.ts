import ApiClient from './apiClient.ts';

interface CarParams {
    brand?: string;
    model?: string;
}

export const createCar = async (formData: FormData) => {
    const res = await ApiClient.post('/cars', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const getAllCars = async ({ brand, model }: CarParams = {}) => {
    const res = await ApiClient.get('/cars', {
        params: {
            brand,
            model,
        },
    });
    return res.data;
};

export const getCar = async (id: string) => {
    const res = await ApiClient.get(`/cars/${id}`);
    return res.data;
};

export const updateCar = async (id: string, data: FormData) => {
    const res = await ApiClient.put(`/cars/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};
