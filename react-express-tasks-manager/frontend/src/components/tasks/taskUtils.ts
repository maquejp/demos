import type { Task } from '../../types/Task';

export const getPriority = (priority: Task['priority']) => {
  const priorityConfig = {
    high: {
      borderClass: 'border border-danger-500',
      headerClass: 'bg-danger-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-high)]',
    },
    medium: {
      borderClass: 'border border-warning-500',
      headerClass: 'bg-warning-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-medium)]',
    },
    low: {
      borderClass: 'border border-success-500',
      headerClass: 'bg-success-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-low)]',
    },
  };

  return (
    priorityConfig[priority] || {
      borderClass: 'border border-warning-500',
      headerClass: 'bg-warning-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-medium)]',
    }
  );
};

export const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'todo':
      return 'bg-gray-100 text-gray-700';
    case 'in-progress':
      return 'bg-blue-100 text-blue-700';
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
