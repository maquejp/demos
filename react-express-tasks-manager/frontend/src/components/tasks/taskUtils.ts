import type { Task } from '../../types/Task';
import { theme } from '../../theme/theme';

export const getPriorityColor = (priority: Task['priority']): string => {
  switch (priority) {
    case 'high':
      return theme.palette.error.main;
    case 'medium':
      return theme.palette.warning.main;
    case 'low':
      return theme.palette.success.main;
    default:
      return theme.palette.grey[500];
  }
};

export const getStatusColor = (status: Task['status']): string => {
  switch (status) {
    case 'todo':
      return theme.palette.warning.main;
    case 'in-progress':
      return theme.palette.info.main;
    case 'completed':
      return theme.palette.success.main;
    case 'cancelled':
      return theme.palette.error.main;
    default:
      return theme.palette.grey[500];
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

export const getPriorityColorMap = (): Record<
  string,
  'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
> => ({
  high: 'error',
  medium: 'warning',
  low: 'success',
});
