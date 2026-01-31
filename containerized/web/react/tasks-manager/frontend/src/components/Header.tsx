import ChecklistIcon from '@mui/icons-material/Checklist';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const Header: React.FC = () => {
  const { currentUser, logout } = useUser();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

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
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flex: 1,
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          <ChecklistIcon sx={{ fontSize: 32, color: 'primary.main' }} />
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
        </Link>

        {/* Desktop Navigation */}
        {isMdUp && (
          <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
            {menuItems.map((item) => (
              <Link
                key={item.to}
                component={RouterLink}
                to={item.to}
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
                {item.label}
              </Link>
            ))}
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
