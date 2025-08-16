import { api, handleApiResponse } from './api';
import { API_ENDPOINTS, PAGE_SIZES } from '../constants';
import { User, UserProfile } from '../types';

export const userService = {
  async getUserProfile(userId: string): Promise<UserProfile> {
    const response = await api.get(API_ENDPOINTS.USERS.GET_PROFILE(userId));
    return handleApiResponse(response);
  },

  async updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.put(API_ENDPOINTS.USERS.UPDATE_PROFILE(userId), data);
    return handleApiResponse(response);
  },

  async searchUsers(searchTerm: string, page = 1, pageSize = PAGE_SIZES.USERS): Promise<User[]> {
    const response = await api.get(API_ENDPOINTS.USERS.SEARCH, {
      params: { searchTerm, page, pageSize },
    });
    return handleApiResponse(response);
  },

  async followUser(userId: string): Promise<void> {
    const response = await api.post(API_ENDPOINTS.USERS.FOLLOW(userId));
    return handleApiResponse(response);
  },

  async unfollowUser(userId: string): Promise<void> {
    const response = await api.delete(API_ENDPOINTS.USERS.UNFOLLOW(userId));
    return handleApiResponse(response);
  },

  async getFollowers(userId: string, page = 1, pageSize = PAGE_SIZES.USERS): Promise<User[]> {
    const response = await api.get(API_ENDPOINTS.USERS.GET_FOLLOWERS(userId), {
      params: { page, pageSize },
    });
    return handleApiResponse(response);
  },

  async getFollowing(userId: string, page = 1, pageSize = PAGE_SIZES.USERS): Promise<User[]> {
    const response = await api.get(API_ENDPOINTS.USERS.GET_FOLLOWING(userId), {
      params: { page, pageSize },
    });
    return handleApiResponse(response);
  },
};