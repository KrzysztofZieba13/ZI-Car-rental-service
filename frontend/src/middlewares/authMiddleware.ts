import { createContext, type MiddlewareFunction, redirect } from 'react-router';
import type { UserType } from '../context/AppContext.tsx';
import { getMe } from '../services/authService.ts';

export const userContext = createContext<UserType | null>(null);

// 2. Middleware
export const authMiddleware: MiddlewareFunction = async ({ context }, next) => {
    console.log('startMiddleware');
    if (context.get(userContext)) {
        console.log('Jest kontekst');
        return next();
    }
    console.log('Brak kontekst');

    try {
        const res = await getMe();
        const user: UserType = res?.data?.user;

        context.set(userContext, user);

        return next();
    } catch (err) {
        if (err instanceof Response) throw err;
        throw redirect('/login');
    }
};
