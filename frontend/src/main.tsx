import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Login from './pages/auth/Login.tsx';
import Signup from './pages/auth/Signup.tsx';
import AddCar from './features/car/AddCar.tsx';
import { AppProvider } from './context/AppContext.tsx';
import { AxiosInterceptor } from './services/AxiosInterceptor.tsx';

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
                path: 'admin',
                children: [
                    { index: true, element: <Navigate to="car" replace /> },
                    { path: 'car', Component: AddCar },
                    { path: 'cars', Component: AddCar },
                    { path: 'employee', Component: AddCar },
                    { path: 'employees', Component: AddCar },
                ],
            },
        ],
    },
    {
        path: '/signup',
        Component: Signup,
    },
    {
        path: '/login',
        Component: Login,
    },
]);

const root: HTMLElement = document.getElementById('root')!;

createRoot(root).render(
    <AppProvider>
        <AxiosInterceptor>
            <RouterProvider router={router} />
        </AxiosInterceptor>
    </AppProvider>,
);
