import ApiClient from './apiClient.ts';

export const createCar = async (formData: FormData) => {
    try {
        const res = await ApiClient.post('/cars', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};
