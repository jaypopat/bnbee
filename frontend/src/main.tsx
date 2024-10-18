import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PropertyPage from '@/pages/Property';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/property',
    element: <PropertyPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
