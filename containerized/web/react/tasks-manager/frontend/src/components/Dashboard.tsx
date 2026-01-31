import { Box, Typography } from '@mui/material';
import { useUser } from '../hooks/useUser';
import TasksNavigation from './tasks/TasksNavigation';

const Dashboard: React.FC = () => {
  const { currentUser } = useUser();
  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ color: 'text.primary', mb: 2 }}
      >
        Welcome, {currentUser?.name}
      </Typography>
      <TasksNavigation />
    </Box>
  );
};

export default Dashboard;
