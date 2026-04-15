import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import postService from '../services/postService';
import { PostsResponse, Post, CreatePostRequest } from '../types/post.types';

/**
 * Custom Hook for fetching posts using TanStack Query
 * Handles pagination and caching
 */

interface UsePosts {
  page?: number;
  size?: number;
}

export const usePosts = ({
  page = 0,
  size = 10,
}: UsePosts = {}): UseQueryResult<PostsResponse, Error> => {
  return useQuery({
    queryKey: ['posts', page, size],
    queryFn: () => postService.getPosts(page, size),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};

/**
 * Custom Hook for creating a post
 * Uses TanStack Query mutation and automatically invalidates posts cache
 */
export const useCreatePost = (): UseMutationResult<Post, Error, CreatePostRequest> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: CreatePostRequest) => postService.createPost(postData),
    onSuccess: () => {
      // Invalidate posts cache to refetch latest posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
