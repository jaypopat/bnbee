import { createContext, ReactNode, useState } from 'react';

interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  createdAt: string,
  ownerRating: number | null,
  reviewerRating: number | null,
}

interface AuthContextT {
  user: User | null;
  signIn: (email: string,  password: string) => Promise<boolean>
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextT>({} as AuthContextT);


export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User| null>(null);

  // Returns whether the user could sign in
  const signIn = async (email: string,  password: string) => {
    const data = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    }).then((response) => response.json());
    console.log(data);

    if (data.ok) {
      setUser(data.body);
      return true;
    }
    return false;
  }

  const signOut = async () => {
    setUser(null);
  }

  const value: AuthContextT = {
    user,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
