import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home.tsx';
import Login from './pages/auth/Login.tsx';
import Signup from './pages/auth/Signup.tsx';
import AdminCar, { handleLoadCar } from './features/car/AdminCar.tsx';
import { AppProvider } from './context/AppContext.tsx';
import { AxiosInterceptor } from './services/AxiosInterceptor.tsx';
import ManageCars, { handleLoadCars } from './features/car/ManageCars.tsx';

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
                    {
                        path: 'car',
                        loader: () => ({ car: null }),
                        Component: AdminCar,
                    },
                    {
                        path: 'cars',
                        loader: handleLoadCars,
                        Component: ManageCars,
                    },
                    {
                        path: 'cars/:id',
                        loader: handleLoadCar,
                        Component: AdminCar,
                    },
                    { path: 'employee', Component: AdminCar },
                    { path: 'employees', Component: AdminCar },
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
