// src/services/postService.ts
import api from "./api";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  createdAt: string; // ISO UTC
  likes: number;
}

export interface PostsResponse {
  posts: Post[];
  count: number;
}

export interface PostsByUserResponse {
  posts: Post[];
  count: number;
}

export const postService = {
  async getAllPosts() {
    const { data } = await api.get<PostsResponse>("/api/posts");
    return data;
  },

  async getPostById(id: number) {
    const { data } = await api.get<Post>(`/api/posts/${id}`);
    return data;
  },

  async createPost(postData: object) {
    const { data } = await api.post<Post>("/api/posts", postData);
    return data;
  },

  async getPostsByUser(userId: number) {
    const { data } = await api.get<PostsByUserResponse>(`/api/posts/user/${userId}`);
    return data;
  },
};