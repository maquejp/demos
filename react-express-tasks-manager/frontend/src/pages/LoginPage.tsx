import ChecklistIcon from '@mui/icons-material/Checklist';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { LocalStorageService } from '../services/localStorageService';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Save remember me preference
      LocalStorageService.setRememberMe(formData.rememberMe);

      // For demo purposes, any email/password combination will work
      // In a real app, this would validate against a backend
      const success = await login(
        formData.email,
        formData.password || 'password',
      );

      if (!success) {
        setError('Invalid email or password');
      }
      // Navigation will be handled automatically by App.tsx when currentUser changes
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Login failed. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4}>
          {/* Header */}
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
            >
              <ChecklistIcon sx={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Tasks Manager
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Powerful task management dashboard to track projects, monitor
              ongoing and completed tasks, and visualize your team's
              productivity with intuitive charts.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to manage your tasks and projects
            </Typography>
          </Box>

          {/* Login Form Card */}
          <Card sx={{ p: 3 }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}
              >
                Sign In
              </Typography>

              {/* Error Message */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Email Field */}
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="you@example.com"
                required
                margin="normal"
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="••••••••"
                required
                margin="normal"
              />

              {/* Remember Me */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        rememberMe: e.target.checked,
                      }))
                    }
                  />
                }
                label="Remember me"
                sx={{ mt: 2, mb: 2 }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  mt: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                {isLoading ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} color="inherit" />
                    <span>Signing in...</span>
                  </Stack>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Clear Storage Option for Testing */}
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button
                  size="small"
                  onClick={() => {
                    localStorage.clear();
                    setError('');
                    window.location.reload();
                  }}
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Clear All Data (Testing)
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Quick Login Actions */}
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setFormData({
                      email: 'alex@example.com',
                      password: 'password123',
                      rememberMe: false,
                    });
                    setError('');
                  }}
                  sx={{ textTransform: 'none' }}
                >
                  Use Alex Account
                </Button>

                <Box
                  sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    typography: 'caption',
                  }}
                >
                  OR
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setFormData({
                      email: 'sarah@example.com',
                      password: 'password123',
                      rememberMe: false,
                    });
                    setError('');
                  }}
                  sx={{ textTransform: 'none' }}
                >
                  Use Sarah Account
                </Button>
              </Stack>

              {/* Links */}
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                        fontSize: '0.875rem',
                      }}
                    >
                      Forgot Password?
                    </Typography>
                  </Link>
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Typography
                      component="span"
                      sx={{
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                        fontSize: '0.875rem',
                      }}
                    >
                      Create Account
                    </Typography>
                  </Link>
                </Stack>
              </Box>
            </Box>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginPage;
