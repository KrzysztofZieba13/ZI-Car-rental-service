export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface IUser {
    id: string;
    role: 'user' | 'admin';
}
