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

export const deleteCar = async (id: string) => {
    const res = await ApiClient.delete(`/cars/${id}`);
    return res.data;
};

export const rentCar = async (id: string, startDate: Date, endDate: Date) => {
    const res = await ApiClient.post('/rent/create', {
        car: id,
        startDate,
        endDate,
    });
    return res.data;
};

export const myRentals = async () => {
    const res = await ApiClient.get('/rent/getAll');
    return res.data;
};
