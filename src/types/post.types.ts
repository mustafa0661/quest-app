/**
 * Post and Comment related types
 */

export interface User {
  id: string;
  userName: string;
  email?: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt?: string;
}

export interface Comment {
  id: string;
  text: string;
  userName: string;
  userId: string;
  postId: string;
  createdAt?: string;
}

export interface Post {
  id: string;
  title: string;
  text: string;
  userName: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  likes: Like[];
  comments?: Comment[];
}

export interface CreatePostRequest {
  title: string;
  text: string;
}

export interface PostsResponse {
  content: Post[];
  pageable?: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements?: number;
  last?: boolean;
}
