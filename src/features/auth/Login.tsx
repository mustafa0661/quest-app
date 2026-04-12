import React, { useState, useCallback } from 'react';
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

  const { isLoading, error, login, clearError } = useLogin();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      
      // Clear error when user starts typing
      if (error) {
        clearError();
      }
    },
    [error, clearError]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await login(formData);
    },
    [formData, login]
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Giriş Yap</h2>
        
        {error && <div className="error-message">{error}</div>}

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
