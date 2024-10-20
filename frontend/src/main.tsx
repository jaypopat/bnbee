import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PropertyPage from "@/pages/Property/PropertyPage.tsx"
import AccountSettings from '@/components/Account.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import Bookings from '@/components/Bookings.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/property',
    element: <PropertyPage />,
  },
  {
    path:'account',
    element: <AccountSettings />,
  },
  {
    path:'bookings',
    element: <Bookings />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
