import type { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  showStatus?: boolean;
}

const getPriority = (priority: Task['priority']) => {
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
      className={`transform transition-all duration-200 hover:scale-[1.02] m-2 rounded overflow-hidden w-60 ${priority.borderClass} ${priority.shadowClass}`}
    >
      {/* Card Header */}
      <div className={`${priority.headerClass} p-3`}>
        <h3 className="text-sm font-semibold text-white">{task.title}</h3>
      </div>

      {/* Card Body */}
      <div className="p-4 bg-white">
        {task.projectId && (
          <div className="mb-2">
            <span className="text-xs text-gray-500">
              Project ID: {task.projectId}
            </span>
          </div>
        )}
        {!task.projectId && (
          <div className="mb-2">
            <span className="text-xs text-gray-500">Standalone task</span>
          </div>
        )}

        <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>

        {showStatus && (
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)} transition-all duration-200 hover:scale-105 cursor-default inline-block`}
            >
              {task.status.replace('-', ' ')}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">&nbsp;</div>
    </div>
  );
};

export default TaskItem;
