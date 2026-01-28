import { Alert, Grid, Typography } from '@mui/material';
import React from 'react';

import { useTasks } from '../../hooks/useTasks';
import type { Task } from '../../types/Task';
import Loading from '../Loading';
import TaskItem from './TaskItem';

interface TasksTableProps {
  status: string;
}

const TasksList: React.FC<TasksTableProps> = ({ status }: TasksTableProps) => {
  const { data, isLoading, error } = useTasks(status);

  if (isLoading) return <Loading message="Loading tasks..." />;

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error: {error.message}
      </Alert>
    );
  }

  const tasks = (data?.data as Task[]) || [];

  return (
    <Grid container spacing={2}>
      {tasks.length === 0 && (
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="body2"
            sx={{ m: 2, p: 1, color: 'text.secondary' }}
          >
            No tasks available in this category.
          </Typography>
        </Grid>
      )}
      {tasks.map((task, i) => (
        <Grid
          key={i}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          display="flex"
          justifyContent="center"
        >
          <TaskItem task={task} showStatus={false} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TasksList;
