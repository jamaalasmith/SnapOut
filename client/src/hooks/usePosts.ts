import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { postService } from '../services/postService';
import { QUERY_KEYS } from '../constants';
import { CreatePost } from '../types';
import { handleApiError } from '../services/api';

export const usePosts = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.POSTS, page, pageSize],
    queryFn: async () => {
      try {
        return await postService.getPosts(page, pageSize);
      } catch (error) {
        // Return empty array if API is not available
        console.warn('API not available, returning empty posts');
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry for demo
    refetchOnMount: false, // Don't refetch on mount for now
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.POST(id),
    queryFn: () => postService.getPostById(id),
    enabled: !!id,
  });
};

export const useUserPosts = (userId: string, page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.USER_POSTS(userId), page, pageSize],
    queryFn: () => postService.getPostsByUser(userId, page, pageSize),
    enabled: !!userId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      message.success('Post created successfully!');
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreatePost }) => 
      postService.updatePost(id, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POST(updatedPost.id) });
      message.success('Post updated successfully!');
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      message.success('Post deleted successfully!');
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      message.success('Post liked!');
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      message.success('Post unliked!');
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });
};