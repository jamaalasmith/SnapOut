// User types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  fullName: string;
  avatarUrl?: string; // Add this for convenience, will be populated from profile
}

export interface UserProfile {
  id: number;
  bio?: string;
  avatarUrl?: string;
  website?: string;
  location?: string;
  dateOfBirth?: string;
  isPrivate: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

// Post types
export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  isPublished: boolean;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  tags: string[];
}

export interface CreatePost {
  title: string;
  content: string;
  imageUrl?: string;
  isPublished?: boolean;
  tagIds: number[];
}

// Auth types
export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: User;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

// Tag types
export interface Tag {
  id: number;
  name: string;
  color: string;
}

// Comment types
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: User;
}