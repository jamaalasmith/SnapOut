import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LoginForm } from '../components/forms/LoginForm';
import { ROUTES } from '../constants';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const from = location.state?.from?.pathname || ROUTES.HOME;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return <LoginForm />;
};