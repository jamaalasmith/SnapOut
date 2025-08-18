// src/services/homeService.ts
import api from "./api";

export interface HomeRoot {
  message: string;
  timestamp: string; // ISO UTC
  version: string;
}

export interface HomeHealth {
  status: "healthy";
  timestamp: string; // ISO UTC
}

export interface HomeInfo {
  api: string;
  environment: string;
  timestamp: string; // ISO UTC
  endpoints: string[];
}

export const homeService = {
  async root() {
    const { data } = await api.get<HomeRoot>("/api/home");
    return data;
  },

  async health() {
    const { data } = await api.get<HomeHealth>("/api/home/health");
    return data;
  },

  async info() {
    const { data } = await api.get<HomeInfo>("/api/home/info");
    return data;
  },
};