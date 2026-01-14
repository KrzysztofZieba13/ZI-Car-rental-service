import { type MiddlewareFunction, redirect } from 'react-router';
import { userContext } from './authMiddleware';
import type { IUser } from '../types/userTypes.ts';

export const adminMiddleware: MiddlewareFunction = async (
    { context },
    next,
) => {
    const user: IUser | null = context.get(userContext);

    if (!user) {
        throw redirect('/login');
    }

    if ((user as IUser).role !== 'admin') {
        throw redirect('/');
    }

    return next();
};
