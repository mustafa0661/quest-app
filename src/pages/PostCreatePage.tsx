import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import PostForm from '../../src/components/Post/PostForm.tsx';

/**
 * PostCreatePage Component
 * Page for creating a new post
 * Requires authentication
 */

const PostCreatePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PostForm />
    </Container>
  );
};

export default PostCreatePage;
