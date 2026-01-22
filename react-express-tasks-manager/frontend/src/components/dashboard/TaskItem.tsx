import type { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  showStatus?: boolean;
}

const getPriority = (priority: Task['priority']) => {
  const priorityConfig = {
    high: {
      borderClass: 'border-l-4 border-danger-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-high)]',
    },
    medium: {
      borderClass: 'border-l-4 border-warning-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-medium)]',
    },
    low: {
      borderClass: 'border-l-4 border-success-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-low)]',
    },
  };

  return (
    priorityConfig[priority] || {
      borderClass: 'border-l-4 border-warning-500',
      shadowClass: 'hover:shadow-[var(--shadow-priority-medium)]',
    }
  );
};

const getStatusColor = (status: Task['status']) => {
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

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  showStatus = true,
}: TaskItemProps) => {
  const priority = getPriority(task.priority);

  return (
    <div
      className={`transform transition-all duration-200 hover:scale-[1.02] m-2 p-4 border rounded mb-2 w-60 h-70 ${priority.borderClass} ${priority.shadowClass}`}
    >
      <div className="bg-gray-200 mb-1">
        <h3 className="text-sm font-semibold text-gray-900">{task.title}</h3>
      </div>
      {task.projectId && (
        <div>
          <span className="text-xs text-gray-500">
            Project ID: {task.projectId}
          </span>
        </div>
      )}
      {!task.projectId && (
        <div>
          <span className="text-xs text-gray-500">Standalone task</span>
        </div>
      )}
      <div>
        <p className="text-gray-600 text-sm line-clamp-2 mt-3">
          {task.description}
        </p>
      </div>
      {showStatus && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)} transition-all duration-200 hover:scale-105 cursor-default`}
          >
            {task.status.replace('-', ' ')}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
