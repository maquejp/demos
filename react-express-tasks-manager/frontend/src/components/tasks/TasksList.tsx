import React, { useEffect, useState } from 'react';
import { Alert, Typography, Grid } from '@mui/material';

import type { Task } from '../../types/Task';
import TaskItem from './TaskItem';
import { tasksApi } from '../../services/tasksService';
import Loading from '../Loading';

interface TasksTableProps {
  status: string;
}

const TasksList: React.FC<TasksTableProps> = ({ status }: TasksTableProps) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errors, setErrors] = useState<string[] | null>(null);

  useEffect(() => {
    tasksApi
      .fetchAll(status)
      .then((response) => {
        setTasks(response.data as Task[]);
        setLoading(false);
      })
      .catch((error) => {
        setErrors([error.message]);
        setLoading(false);
      });
  }, [status]);

  if (loading) return <Loading message="Loading tasks..." />;

  if (!loading && errors) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error: {errors.join(', ')}
      </Alert>
    );
  }

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
