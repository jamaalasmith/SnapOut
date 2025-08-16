import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { RegisterForm } from '../components/forms/RegisterForm';
import { ROUTES } from '../constants';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <RegisterForm />;
};