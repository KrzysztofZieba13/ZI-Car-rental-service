import ApiClient from './apiClient.ts';
import type { SignupFormValues } from '../pages/auth/Signup.tsx';
import type { LoginFormValues } from '../pages/auth/Login.tsx';

export const signup = async (data: SignupFormValues) => {
    const res = await ApiClient.post('/auth/signup', data);
    return res.data;
};

export const login = async (data: LoginFormValues) => {
    const res = await ApiClient.post('/auth/signin', data);
    return res.data;
};

export const getMe = async () => {
    const res = await ApiClient.get('/auth/me');
    return res.data;
};

export const logout = async () => {
    const res = await ApiClient.get('/auth/logout');
    return res.data;
};
