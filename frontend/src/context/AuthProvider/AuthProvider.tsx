import {createContext, ReactNode, useEffect, useState} from 'react';
import { getAuthToken, setAuthToken } from '@/api';
import { getUser } from '@/api/user';
import {Loader} from "lucide-react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  ownerRating: number | null;
  guestRating: number | null;
  role: 'user' | 'admin';
}

interface AuthContextT {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextT>({} as AuthContextT);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('authToken');
            console.log('Token:', token);
            if (token) {
                setAuthToken(token);
                try {
                    const userData = await getUser();
                    console.log('User data:', userData);
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    localStorage.removeItem('authToken');
                }
            }
            else {
                console.log('No token found');
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);


  // Returns whether the user could sign in
  const signIn = async (email: string, password: string) => {
    try {
      // Get the auth token from the auth endpoint.
      const token = await getAuthToken(email, password);
      setAuthToken(token as string);
      // Get the user from the user endpoint using the auth token.
        const userData = await getUser();
      setUser(userData);

      return true;
    } catch (error) {
      console.error('Error during sign-in:', error);
      return false;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const user = await response.json();
      setUser(user);

      alert('User signed up successfully!');
      return true;
    } catch (error) {
      console.error('Error during sign-up:', error);
      return false;
    }
  };

  const signOut = async () => {
    setUser(null);
    setAuthToken();
  };

  const value: AuthContextT = {
    user,
    signIn,
    signOut,
    signUp,
  };
    if (loading) {
        return <div className="flex justify-center items-center"><Loader/></div>;
    }
    console.log('User:', user);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
