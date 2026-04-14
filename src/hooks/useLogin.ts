import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { LoginRequest } from '../types/auth.types';

/**
 * Custom Hook for Login Logic
 * Handles authentication, loading states, and error management
 */

interface UseLoginReturn {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  login: (loginData: LoginRequest) => Promise<void>;
  clearError: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validateInput = useCallback((loginData: LoginRequest): boolean => {
    if (!loginData.userName || !loginData.password) {
      setError('Lütfen kullanıcı adı ve şifre giriniz.');
      return false;
    }
    return true;
  }, []);

  const login = useCallback(async (loginData: LoginRequest): Promise<void> => {
    setError(null);
    setIsSuccess(false);
    
    if (!validateInput(loginData)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(loginData);
      
      // Store auth data
      localStorage.setItem('token', response.token);
      localStorage.setItem('userName', loginData.userName);

      console.log('Login successful!');
      // Set success state (will trigger useEffect to navigate)
      setIsSuccess(true);
    } catch (err: any) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Bilinmeyen hata oluştu';
      
      setError(`Giriş başarısız: ${errorMessage}`);
      console.error('Login failed:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [validateInput]);

  // Navigate to home when login is successful
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        console.log('Navigating to home...');
        navigate('/', { replace: true });
      }, 500); // 500ms delay for better UX
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    isSuccess,
    login,
    clearError,
  };
};
