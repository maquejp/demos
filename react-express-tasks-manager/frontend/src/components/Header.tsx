import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Link,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '../hooks/useUser';

const Header: React.FC = () => {
  const { currentUser, logout } = useUser();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.divider,
      }}
    >
      <Toolbar>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: theme.palette.primary.main }}
          >
            <rect
              x="4"
              y="2"
              width="16"
              height="20"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M8 2V4H16V2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 10H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 14H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 18H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'text.primary',
            }}
          >
            Tasks Manager
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {isMdUp && (
          <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
            <Link
              component={RouterLink}
              to="/"
              sx={{
                color: 'text.primary',
                textDecoration: 'none',
                px: 1.5,
                py: 1,
                borderRadius: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'action.hover',
                },
              }}
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to="/about"
              sx={{
                color: 'text.primary',
                textDecoration: 'none',
                px: 1.5,
                py: 1,
                borderRadius: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'action.hover',
                },
              }}
            >
              About
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              sx={{
                color: 'text.primary',
                textDecoration: 'none',
                px: 1.5,
                py: 1,
                borderRadius: 1,
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'action.hover',
                },
              }}
            >
              Contact
            </Link>
          </Stack>
        )}

        {/* User Section */}
        {currentUser && isSmUp && (
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Avatar
              src={
                currentUser?.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name}`
              }
              alt={currentUser?.name}
              sx={{ width: 32, height: 32 }}
            />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {currentUser?.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
              >
                {currentUser?.role}
              </Typography>
            </Box>
            <IconButton
              onClick={logout}
              size="small"
              title="Logout"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
