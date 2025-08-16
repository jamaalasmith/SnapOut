import { api, handleApiResponse } from './api';
import { API_ENDPOINTS, PAGE_SIZES } from '../constants';
import { Post, CreatePost } from '../types';

export const postService = {
  async getPosts(page = 1, pageSize = PAGE_SIZES.POSTS): Promise<Post[]> {
    const response = await api.get(API_ENDPOINTS.POSTS.GET_ALL, {
      params: { page, pageSize },
    });
    return handleApiResponse(response);
  },

  async getPostById(id: number): Promise<Post> {
    const response = await api.get(API_ENDPOINTS.POSTS.GET_BY_ID(id));
    return handleApiResponse(response);
  },

  async getPostsByUser(userId: string, page = 1, pageSize = PAGE_SIZES.POSTS): Promise<Post[]> {
    const response = await api.get(API_ENDPOINTS.POSTS.GET_BY_USER(userId), {
      params: { page, pageSize },
    });
    return handleApiResponse(response);
  },

  async createPost(data: CreatePost): Promise<Post> {
    const response = await api.post(API_ENDPOINTS.POSTS.CREATE, data);
    return handleApiResponse(response);
  },

  async updatePost(id: number, data: CreatePost): Promise<Post> {
    const response = await api.put(API_ENDPOINTS.POSTS.UPDATE(id), data);
    return handleApiResponse(response);
  },

  async deletePost(id: number): Promise<void> {
    const response = await api.delete(API_ENDPOINTS.POSTS.DELETE(id));
    return handleApiResponse(response);
  },

  async likePost(id: number): Promise<void> {
    const response = await api.post(API_ENDPOINTS.POSTS.LIKE(id));
    return handleApiResponse(response);
  },

  async unlikePost(id: number): Promise<void> {
    const response = await api.delete(API_ENDPOINTS.POSTS.UNLIKE(id));
    return handleApiResponse(response);
  },
};