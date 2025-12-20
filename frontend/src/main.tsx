import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Login from './pages/auth/Login.tsx';
import Signup from './pages/auth/Signup.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/signup',
                Component: Signup,
            },
            {
                path: '/login',
                Component: Login,
            },
        ],
    },
]);

const root: HTMLElement = document.getElementById('root')!;

createRoot(root).render(<RouterProvider router={router} />);
