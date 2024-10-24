import { useContext } from 'react';
import { AuthContext } from './AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const signOutAndNavigate = () => {
    context.signOut();
    navigate('/');
  };
  return {
    ...context,
    signOut: signOutAndNavigate,
  };
}
