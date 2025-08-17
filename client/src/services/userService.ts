// src/services/userService.ts
import api from "./api";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string; // ISO UTC
}

export interface UsersResponse {
  users: User[];
  count: number;
}

export const userService = {
  async getAllUsers() {
    const { data } = await api.get<UsersResponse>("/api/users");
    return data;
  },

  async getUserById(id: number) {
    const { data } = await api.get<User>(`/api/users/${id}`);
    return data;
  },

  async createUser(userData: object) {
    const { data } = await api.post<User>("/api/users", userData);
    return data;
  },
};