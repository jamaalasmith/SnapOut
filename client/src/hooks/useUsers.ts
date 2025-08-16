import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { userService } from '../services/userService';
import { QUERY_KEYS } from '../constants';
import { UserProfile } from '../types';
import { handleApiError } from '../services/api';

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_PROFILE(userId),
    queryFn: async () => {
      try {
        return await userService.getUserProfile(userId);
      } catch (error) {
        // Return mock profile if API is not available
        console.warn('API not available, returning mock profile');
        return {
          id: 1,
          bio: 'This is a demo profile. Connect your API to see real data.',
          avatarUrl: undefined,
          website: 'https://snapout.com',
          location: 'San Francisco, CA',
          dateOfBirth: undefined,
          isPrivate: false,
          followersCount: 156,
          followingCount: 89,
          postsCount: 12,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            id: userId,
            email: 'demo@snapout.com',
            firstName: 'Demo',
            lastName: 'User',
            createdAt: new Date().toISOString(),
            fullName: 'Demo User',
          }
        };
      }
    },
    enabled: !!userId,
    retry: false,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<UserProfile> }) => 
      userService.updateUserProfile(userId, data),
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.USER_PROFILE(updatedProfile.user.id) 
      });
      message.success('Profile updated successfully!');
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });
};

export const useSearchUsers = (searchTerm: string, page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.USERS, 'search', searchTerm, page, pageSize],
    queryFn: () => userService.searchUsers(searchTerm, page, pageSize),
    enabled: searchTerm.length > 2, // Only search when term is longer than 2 characters
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
      message.success('User followed!');
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
      message.success('User unfollowed!');
    },
    onError: (error) => {
      message.error(handleApiError(error));
    },
  });
};

export const useFollowers = (userId: string, page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.FOLLOWERS(userId), page, pageSize],
    queryFn: () => userService.getFollowers(userId, page, pageSize),
    enabled: !!userId,
  });
};

export const useFollowing = (userId: string, page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.FOLLOWING(userId), page, pageSize],
    queryFn: () => userService.getFollowing(userId, page, pageSize),
    enabled: !!userId,
  });
};