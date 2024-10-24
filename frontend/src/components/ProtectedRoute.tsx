import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from "@/context/AuthProvider";

export default function ProtectedRoute ({ children } : { children: ReactNode }) {
    {
        const {user} = useAuth();
        const location = useLocation();

        if (!user) {
            return <Navigate to="/" state={{from: location}} replace/>;
        }

        return <>{children}</>;
    }
}