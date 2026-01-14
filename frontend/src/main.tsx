import { createRoot } from 'react-dom/client';
import App, { rootLoader } from './App.tsx';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login.tsx';
import Signup from './pages/auth/Signup.tsx';
import AdminCar, { handleLoadCar } from './features/car/AdminCar.tsx';
import { AppProvider } from './context/AppContext.tsx';
import { AxiosInterceptor } from './services/AxiosInterceptor.tsx';
import Cars, {
    handleLoadCars,
    handleLoadRentals,
} from './features/car/Cars.tsx';
import { authMiddleware } from './middlewares/authMiddleware.ts';
import { adminMiddleware } from './middlewares/adminMiddleware.ts';

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        loader: rootLoader,
        middleware: [authMiddleware],
        children: [
            {
                index: true,
                element: <Navigate to="cars" replace />,
            },
            {
                path: 'cars',
                loader: handleLoadCars,
                Component: Cars,
            },
            {
                path: 'rentals',
                loader: handleLoadRentals,
                Component: Cars,
            },
            {
                path: 'admin',
                middleware: [adminMiddleware],
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
                        Component: Cars,
                    },
                    {
                        path: 'cars/:id',
                        loader: handleLoadCar,
                        Component: AdminCar,
                    },
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
