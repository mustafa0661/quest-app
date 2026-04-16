import { useState, useCallback } from 'react';
import authService from '../services/authService';
import { RegisterRequest } from '../types/auth.types';

/**
 * Custom Hook for Register Logic
 * Handles user registration, loading states, and error management
 */

interface UseRegisterReturn {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  register: (registerData: RegisterRequest) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validateInput = useCallback((registerData: RegisterRequest): boolean => {
    if (!registerData.userName || !registerData.password) {
      setError('Lütfen kullanıcı adı ve şifre giriniz.');
      return false;
    }
    if (registerData.password.length < 3) {
      setError('Şifre en az 3 karakter olmalıdır.');
      return false;
    }
    return true;
  }, []);

  const register = useCallback(async (registerData: RegisterRequest): Promise<void> => {
    setError(null);
    setIsSuccess(false);
    
    if (!validateInput(registerData)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register(registerData);
      console.log('Registration successful!', response);
      setIsSuccess(true);
    } catch (err: any) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Bilinmeyen hata oluştu';
      
      setError(`Kayıt başarısız: ${errorMessage}`);
      console.error('Registration failed:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [validateInput]);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  const reset = useCallback((): void => {
    setError(null);
    setIsSuccess(false);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    isSuccess,
    register,
    clearError,
    reset,
  };
};
