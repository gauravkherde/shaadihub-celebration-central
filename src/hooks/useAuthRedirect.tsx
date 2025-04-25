
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoAuth } from '@/contexts/DemoAuthContext';

export const useAuthRedirect = (redirectIfAuthenticated: boolean = false) => {
  const { isAuthenticated } = useDemoAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !redirectIfAuthenticated) {
      navigate('/login');
    } else if (isAuthenticated && redirectIfAuthenticated) {
      navigate('/events/dashboard');
    }
  }, [isAuthenticated, navigate, redirectIfAuthenticated]);

  return { isAuthenticated };
};
