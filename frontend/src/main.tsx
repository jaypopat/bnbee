import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import PropertyPage from '@/pages/Property/PropertyPage.tsx';
import AccountSettings from '@/pages/Account/Account.tsx';
import {Toaster} from './components/ui/toaster.tsx';
import Bookings from '@/pages/Booking/Bookings.tsx';
import AuthProvider from '@/context/AuthProvider/AuthProvider.tsx';
import ProtectedRoute from '@/components/ProtectedRoute.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/property',
        element: <PropertyPage/>,
    },
    {
        path: 'account',
        element: (
            <ProtectedRoute>
                <AccountSettings/>
            </ProtectedRoute>
        ),
    },
    {
        path: 'bookings',
        element: (
            <ProtectedRoute>
                <Bookings/>
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/" replace/>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
            <Toaster/>
        </AuthProvider>
    </StrictMode>
);
