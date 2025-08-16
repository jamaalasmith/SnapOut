import { api, handleApiResponse } from './api';
import { API_ENDPOINTS } from '../constants';
import { LoginData, RegisterData, AuthResponse } from '../types';

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, data);
    return handleApiResponse(response);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
    return handleApiResponse(response);
  },

  async logout(): Promise<void> {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return handleApiResponse(response);
  },
};