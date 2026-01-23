import type { Task } from '../../types/Task';

export const getPriority = (priority: Task['priority']) => {
  const priorityConfig = {
    high: {
      borderClass: 'border border-danger-500',
      headerClass: 'bg-danger-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-high)]',
      color: '#ef4444',
    },
    medium: {
      borderClass: 'border border-warning-500',
      headerClass: 'bg-warning-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-medium)]',
      color: '#f59e0b',
    },
    low: {
      borderClass: 'border border-success-500',
      headerClass: 'bg-success-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-low)]',
      color: '#10b981',
    },
  };

  return (
    priorityConfig[priority] || {
      borderClass: 'border border-warning-500',
      headerClass: 'bg-warning-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-medium)]',
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
