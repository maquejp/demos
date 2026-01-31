import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        m: 2,
        minHeight: '200px',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography sx={{ color: 'text.secondary' }}>
          {message || 'Loading...'}
        </Typography>
      </Box>
    </Box>
  );
};

export default Loading;
