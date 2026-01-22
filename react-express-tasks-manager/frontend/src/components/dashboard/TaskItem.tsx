import type { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  showStatus?: boolean;
}

const getPriorityClass = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'border-l-4 border-danger-500';
    case 'medium':
      return 'border-l-4 border-warning-500';
    case 'low':
      return 'border-l-4 border-success-500';
    default:
      return 'border-l-4 border-warning-500';
  }
};

const getPriorityShadowClass = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'hover:shadow-[var(--shadow-priority-high)]';
    case 'medium':
      return 'hover:shadow-[var(--shadow-priority-medium)]';
    case 'low':
      return 'hover:shadow-[var(--shadow-priority-low)]';
    default:
      return 'hover:shadow-[var(--shadow-priority-medium)]';
  }
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
  return (
    <div
      className={`transform transition-all duration-200 hover:scale-[1.02] m-2 p-4 border rounded mb-2 w-60 h-70 ${getPriorityClass(task.priority)} ${getPriorityShadowClass(task.priority)}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">
            {task.title}
          </h3>
          {task.projectId && (
            <span className="text-xs text-gray-500">
              Project ID: {task.projectId}
            </span>
          )}
          {!task.projectId && (
            <span className="text-xs text-gray-500">Standalone task</span>
          )}
          <p className="text-gray-600 text-sm line-clamp-2 mt-3">
            {task.description}
          </p>
        </div>
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
