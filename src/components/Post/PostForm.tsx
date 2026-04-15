import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCreatePost } from '../../hooks/usePosts';
import { CreatePostRequest } from '../../types/post.types';

/**
 * PostForm Component
 * Form for creating new posts
 */

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: createPost, isPending, isError, error } = useCreatePost();
  const userId = localStorage.getItem('userId') || '1';

  const [formData, setFormData] = useState<Omit<CreatePostRequest, 'userId'>>({
    title: '',
    text: '',
  });

  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    text?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { title?: string; text?: string } = {};

    if (!formData.title.trim()) {
      errors.title = 'Başlık gereklidir';
    } else if (formData.title.length < 3) {
      errors.title = 'Başlık en az 3 karakter olmalıdır';
    }

    if (!formData.text.trim()) {
      errors.text = 'İçerik gereklidir';
    } else if (formData.text.length < 5) {
      errors.text = 'İçerik en az 5 karakter olmalıdır';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const postData: CreatePostRequest = {
      ...formData,
      userId: parseInt(userId, 10),
    };

    createPost(postData, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <Box className="post-form-page" sx={{ py: 4 }}>
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{ mb: 2 }}
            >
              Geri Dön
            </Button>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Yeni Post Oluştur
            </Typography>
          </Box>

          {isError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error?.message || 'Post oluşturulurken bir hata occurred'}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Başlık"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!validationErrors.title}
              helperText={validationErrors.title}
              placeholder="Post başlığını girin..."
              margin="normal"
              disabled={isPending}
            />

            <TextField
              fullWidth
              label="İçerik"
              name="text"
              value={formData.text}
              onChange={handleChange}
              error={!!validationErrors.text}
              helperText={validationErrors.text}
              placeholder="Post içeriğini girin..."
              margin="normal"
              multiline
              rows={6}
              disabled={isPending}
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                type="submit"
                startIcon={isPending ? <CircularProgress size={20} /> : <SendIcon />}
                disabled={isPending}
                fullWidth
              >
                {isPending ? 'Gönderiliyor...' : 'Post Oluştur'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                disabled={isPending}
              >
                İptal
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostForm;
