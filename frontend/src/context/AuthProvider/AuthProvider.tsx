import { createContext, ReactNode, useState } from 'react';

interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  createdAt: string,
  ownerRating: number | null,
  guestRating: number | null,
  role: 'user' | 'admin'
}

interface AuthContextT {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextT>({} as AuthContextT);


export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Returns whether the user could sign in
  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const user = await response.json();
      console.log('User:', user);
      setUser(user);

      alert('User signed in successfully!')
      return user;

    } catch (error) {
      console.error('Error during sign-in:', error);
      return null;
    }
  };
  const signUp = async (email: string, password: string):Promise<boolean> => {
    // implement register endpoint in spring boot
    return true;
  }


  const signOut = async () => {
    setUser(null);
  };

  const value: AuthContextT = {
    user,
    signIn,
    signOut,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
