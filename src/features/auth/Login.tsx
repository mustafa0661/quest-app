import React, { useState, useCallback, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { LoginRequest } from '../../types/auth.types';
import './Login.css';

/**
 * Login Component
 * Handles user authentication with proper TypeScript types and error handling
 */

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    userName: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState<string>('');

  const { isLoading, error, isSuccess, login, clearError } = useLogin();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      
      // Clear messages when user starts typing
      if (error) {
        clearError();
      }
      if (successMessage) {
        setSuccessMessage('');
      }
    },
    [error, clearError, successMessage]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSuccessMessage('');
      await login(formData);
    },
    [formData, login]
  );

  // Show success message when login is successful
  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage('Giriş başarılı, yönlendiriliyorsunuz...');
    }
  }, [isSuccess]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Giriş Yap</h2>
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="userName"
              placeholder="Kullanıcı Adı"
              value={formData.userName}
              onChange={handleInputChange}
              disabled={isLoading}
              className="form-input"
              aria-label="Kullanıcı Adı"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              className="form-input"
              aria-label="Şifre"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
