export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  USER_PROFILE: '/profile/:userId',
  POST: '/post/:id',
  CREATE_POST: '/create-post',
  EDIT_POST: '/edit-post/:id',
  EXPLORE: '/explore',
  FOLLOWERS: '/followers',
  FOLLOWING: '/following',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },
  POSTS: {
    GET_ALL: '/api/posts',
    GET_BY_ID: (id: number) => `/api/posts/${id}`,
    GET_BY_USER: (userId: string) => `/api/posts/user/${userId}`,
    CREATE: '/api/posts',
    UPDATE: (id: number) => `/api/posts/${id}`,
    DELETE: (id: number) => `/api/posts/${id}`,
    LIKE: (id: number) => `/api/posts/${id}/like`,
    UNLIKE: (id: number) => `/api/posts/${id}/like`,
  },
  USERS: {
    GET_PROFILE: (userId: string) => `/api/users/${userId}/profile`,
    UPDATE_PROFILE: (userId: string) => `/api/users/${userId}/profile`,
    SEARCH: '/api/users/search',
    FOLLOW: (userId: string) => `/api/users/${userId}/follow`,
    UNFOLLOW: (userId: string) => `/api/users/${userId}/follow`,
    GET_FOLLOWERS: (userId: string) => `/api/users/${userId}/followers`,
    GET_FOLLOWING: (userId: string) => `/api/users/${userId}/following`,
  },
} as const;

export const QUERY_KEYS = {
  POSTS: ['posts'],
  POST: (id: number) => ['post', id],
  USER_POSTS: (userId: string) => ['posts', 'user', userId],
  USER_PROFILE: (userId: string) => ['user', 'profile', userId],
  USERS: ['users'],
  FOLLOWERS: (userId: string) => ['followers', userId],
  FOLLOWING: (userId: string) => ['following', userId],
} as const;

export const PAGE_SIZES = {
  POSTS: 10,
  USERS: 20,
  COMMENTS: 10,
} as const;