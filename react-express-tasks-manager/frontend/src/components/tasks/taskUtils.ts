import type { Task } from '../../types/Task';

export const getPriority = (priority: Task['priority']) => {
  const priorityConfig = {
    high: {
      color: '#ef4444',
    },
    medium: {
      color: '#f59e0b',
    },
    low: {
      color: '#10b981',
    },
  };

  return (
    priorityConfig[priority] || {
      color: '#f59e0b',
    }
  );
};

export const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'todo':
      return 'warning';
    case 'in-progress':
      return 'info';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

export const getStatusColorMap = (): Record<
  string,
  'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
> => ({
  'in-progress': 'info',
  todo: 'warning',
  completed: 'success',
  cancelled: 'error',
});
