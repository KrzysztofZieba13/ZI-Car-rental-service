import { createContext, type MiddlewareFunction, redirect } from 'react-router';
import { getMe } from '../services/authService.ts';

export const userContext = createContext(null);

export const authMiddleware: MiddlewareFunction = async ({ context }, next) => {
    if (context.get(userContext)) {
        return next();
    }

    try {
        const res = await getMe();
        const user = res?.data?.user;

        context.set(userContext, user);
        return next();
    } catch (err) {
        if (err instanceof Response) throw err;
        throw redirect('/login');
    }
};
