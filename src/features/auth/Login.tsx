import React, { useState, useCallback, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useRegister } from '../../hooks/useRegister';
import { LoginRequest, RegisterRequest } from '../../types/auth.types';
import './Login.css';

/**
 * Login Component
 * Handles user authentication with proper TypeScript types and error handling
 */

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  const [loginFormData, setLoginFormData] = useState<LoginRequest>({
    userName: '',
    password: '',
  });

  const [registerFormData, setRegisterFormData] = useState<RegisterRequest>({
    userName: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState<string>('');

  const { isLoading: isLoginLoading, error: loginError, isSuccess: isLoginSuccess, login, clearError: clearLoginError } = useLogin();
  const { isLoading: isRegisterLoading, error: registerError, isSuccess: isRegisterSuccess, register, clearError: clearRegisterError, reset: resetRegister } = useRegister();

  const handleLoginInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      
      // Clear messages when user starts typing
      if (loginError) {
        clearLoginError();
      }
      if (successMessage) {
        setSuccessMessage('');
      }
    },
    [loginError, clearLoginError, successMessage]
  );

  const handleRegisterInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setRegisterFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      
      // Clear messages when user starts typing
      if (registerError) {
        clearRegisterError();
      }
      if (successMessage) {
        setSuccessMessage('');
      }
    },
    [registerError, clearRegisterError, successMessage]
  );

  const handleLoginSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSuccessMessage('');
      await login(loginFormData);
    },
    [loginFormData, login]
  );

  const handleRegisterSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSuccessMessage('');
      await register(registerFormData);
    },
    [registerFormData, register]
  );

  const handleModeSwitch = useCallback((newMode: 'login' | 'register') => {
    setMode(newMode);
    setSuccessMessage('');
    resetRegister();
    clearLoginError();
  }, [resetRegister, clearLoginError]);

  // Show success message when login is successful
  useEffect(() => {
    if (isLoginSuccess) {
      setSuccessMessage('Giriş başarılı, yönlendiriliyorsunuz...');
    }
  }, [isLoginSuccess]);

  // Show success message when registration is successful
  useEffect(() => {
    if (isRegisterSuccess) {
      setSuccessMessage('Kayıt başarılı! Lütfen giriş yapınız.');
      setRegisterFormData({ userName: '', password: '' });
      // Switch to login mode after 2 seconds
      setTimeout(() => {
        handleModeSwitch('login');
      }, 2000);
    }
  }, [isRegisterSuccess, handleModeSwitch]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</h2>
        
        {/* Mode Toggle Buttons */}
        <div className="auth-mode-toggle">
          <button
            type="button"
            className={`toggle-button ${mode === 'login' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('login')}
            disabled={isLoginLoading || isRegisterLoading}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            className={`toggle-button ${mode === 'register' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('register')}
            disabled={isLoginLoading || isRegisterLoading}
          >
            Kayıt Ol
          </button>
        </div>
        
        {/* Error and Success Messages */}
        {loginError && mode === 'login' && <div className="error-message">{loginError}</div>}
        {registerError && mode === 'register' && <div className="error-message">{registerError}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="userName"
                placeholder="Kullanıcı Adı"
                value={loginFormData.userName}
                onChange={handleLoginInputChange}
                disabled={isLoginLoading}
                className="form-input"
                aria-label="Kullanıcı Adı"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                value={loginFormData.password}
                onChange={handleLoginInputChange}
                disabled={isLoginLoading}
                className="form-input"
                aria-label="Şifre"
              />
            </div>

            <button
              type="submit"
              disabled={isLoginLoading}
              className="login-button"
            >
              {isLoginLoading ? 'Giriş Yapılıyor...' : 'Giriş'}
            </button>
          </form>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="userName"
                placeholder="Kullanıcı Adı"
                value={registerFormData.userName}
                onChange={handleRegisterInputChange}
                disabled={isRegisterLoading}
                className="form-input"
                aria-label="Kullanıcı Adı"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                value={registerFormData.password}
                onChange={handleRegisterInputChange}
                disabled={isRegisterLoading}
                className="form-input"
                aria-label="Şifre"
              />
            </div>

            <button
              type="submit"
              disabled={isRegisterLoading}
              className="login-button"
            >
              {isRegisterLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
