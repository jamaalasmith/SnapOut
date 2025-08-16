import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '../stores/authStore';
import { LoginData, RegisterData } from '../types';
import { handleApiError } from '../services/api';
import { ROUTES } from '../constants';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      message.success('Login successful!');
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      message.success('Registration successful!');
      navigate(ROUTES.HOME);
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      message.success('Logged out successfully!');
      navigate(ROUTES.LOGIN);
    },
    onError: (error) => {
      // Even if logout API fails, clear local auth
      clearAuth();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
      message.error(handleApiError(error));
    },
  });

  const login = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const register = (data: RegisterData) => {
    registerMutation.mutate(data);
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};