import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        zIndex: 10,
        borderTop: 1,
        borderTopColor: 'divider',
        py: 2,
        mt: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          © 2026 Task Manager
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
