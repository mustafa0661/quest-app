import axios, { AxiosInstance } from 'axios';
import { LoginRequest, LoginResponse } from '../types/auth.types';

/**
 * API Service for Authentication
 * Handles all auth-related API calls
 */

class AuthService {
  private apiClient: AxiosInstance;
  private baseURL: string = '/auth'; // Uses proxy from package.json

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
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * Login user with credentials
   * @param loginData - Username and password
   * @returns Login response with token
   */
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.apiClient.post<LoginResponse>('/login', loginData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  }

  /**
   * Get stored token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Get stored username from localStorage
   */
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
