import axios, { AxiosInstance } from 'axios';
import { Post, CreatePostRequest, PostsResponse } from '../types/post.types';

/**
 * API Service for Posts
 * Handles all post-related API calls
 */

class PostService {
  private apiClient: AxiosInstance;
  private baseURL: string = '/posts';

  constructor() {
    this.apiClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Add token to requests if it exists
    this.apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      console.log('PostService request interceptor:', {
        hasToken: !!token,
        tokenPreview: token ? `${token.substring(0, 20)}...` : 'no token',
        url: config.url,
      });
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Global error handling
    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('PostService response error:', {
          status: error.response?.status,
          message: error.response?.data?.message,
          url: error.config?.url,
        });

        if (error.response?.status === 401 || error.response?.status === 403) {
          console.warn('Auth failed (401/403), clearing token and redirecting to login');
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get all posts with pagination
   * @param page - Page number (0-indexed)
   * @param size - Page size
   * @returns Posts response
   */
  async getPosts(page: number = 0, size: number = 10): Promise<PostsResponse> {
    try {
      const response = await this.apiClient.get<PostsResponse>(
        `?page=${page}&size=${size}&sort=createdAt,desc`
      );
      return response.data;
    } catch (error: any) {
      console.error('PostService.getPosts() error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
      });
      
      const message = error.response?.data?.message 
        || error.message 
        || 'Failed to fetch posts. Check if backend is running on http://localhost:8080';
      throw new Error(message);
    }
  }

  /**
   * Get single post by ID
   * @param postId - Post ID
   * @returns Post data
   */
  async getPost(postId: string): Promise<Post> {
    try {
      const response = await this.apiClient.get<Post>(`/${postId}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch post';
      throw new Error(message);
    }
  }

  /**
   * Create new post
   * @param postData - Post creation data
   * @returns Created post
   */
  async createPost(postData: CreatePostRequest): Promise<Post> {
    try {
      const response = await this.apiClient.post<Post>('', postData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create post';
      throw new Error(message);
    }
  }

  /**
   * Update post
   * @param postId - Post ID
   * @param postData - Post update data
   * @returns Updated post
   */
  async updatePost(postId: string, postData: Partial<CreatePostRequest>): Promise<Post> {
    try {
      const response = await this.apiClient.put<Post>(`/${postId}`, postData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update post';
      throw new Error(message);
    }
  }

  /**
   * Delete post
   * @param postId - Post ID
   */
  async deletePost(postId: string): Promise<void> {
    try {
      await this.apiClient.delete(`/${postId}`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete post';
      throw new Error(message);
    }
  }
}

const postService = new PostService();
export default postService;
