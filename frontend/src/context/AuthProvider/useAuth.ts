import { useContext } from 'react';
import { AuthContext } from "./AuthProvider.tsx";

export default function useAuth() {
  return useContext(AuthContext);
}
