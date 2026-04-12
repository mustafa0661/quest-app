import { useState, useCallback } from 'react';
import authService from '../services/authService';
import { LoginRequest } from '../types/auth.types';

/**
 * Custom Hook for Login Logic
 * Handles authentication, loading states, and error management
 */

interface UseLoginReturn {
  isLoading: boolean;
  error: string | null;
  login: (loginData: LoginRequest) => Promise<void>;
  clearError: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateInput = useCallback((loginData: LoginRequest): boolean => {
    if (!loginData.userName || !loginData.password) {
      setError('Lütfen kullanıcı adı ve şifre giriniz.');
      return false;
    }
    return true;
  }, []);

  const login = useCallback(async (loginData: LoginRequest): Promise<void> => {
    setError(null);
    
    if (!validateInput(loginData)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(loginData);
      
      // Store auth data
      localStorage.setItem('token', response.token);
      localStorage.setItem('userName', loginData.userName);

      // Show success message
      alert('Giriş Başarılı');

      // Navigate to home (commented out as per original code)
      // navigate("/");
    } catch (err: any) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Bilinmeyen hata oluştu';
      
      setError(`Giriş başarısız: ${errorMessage}`);
      alert(`Giriş başarısız: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [validateInput]);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    login,
    clearError,
  };
};
