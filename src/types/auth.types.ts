/**
 * Authentication related types
 */

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userName: string;
  userId?: string | number;
  message?: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthContextType {
  token: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => void;
}
