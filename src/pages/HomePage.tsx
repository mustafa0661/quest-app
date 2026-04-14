import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Typography, Card } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import './HomePage.css';

/**
 * HomePage Component
 * Simple welcome page for authenticated users
 */

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/auth/login');
  };

  return (
    <Container className="home-page">
      <Box className="welcome-container">
        <Card className="welcome-card">
          <Box className="welcome-header">
            <Typography variant="h3" className="welcome-title">
              Hoş Geldiniz! 👋
            </Typography>
            <Typography variant="h5" className="welcome-subtitle">
              {userName ? `Merhaba, ${userName}!` : 'Hoş geldiniz!'}
            </Typography>
          </Box>

          <Box className="welcome-content">
            <Typography variant="body1" className="welcome-text">
              Ana sayfaya başarıyla yönlendirildiniz. Kullanıcı doğrulaması başarılı!
            </Typography>

            <Box className="features-list">
              <Typography variant="h6">Mevcut Özellikler:</Typography>
              <ul>
                <li>✅ Kullanıcı Girişi (Login)</li>
                <li>✅ Ana Sayfaya Yönlendirme</li>
                <li>🔄 Gönderiler (Backend geliştirme aşamasında)</li>
                <li>🔄 Profil (Backend geliştirme aşamasında)</li>
              </ul>
            </Box>

            <Box className="token-info">
              <Typography variant="caption" className="token-label">
                Saklanan Token:
              </Typography>
              <Typography variant="body2" className="token-value">
                {localStorage.getItem('token')?.substring(0, 30)}...
              </Typography>
            </Box>
          </Box>

          <Box className="welcome-actions">
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              fullWidth
            >
              Çıkış Yap
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default HomePage;
