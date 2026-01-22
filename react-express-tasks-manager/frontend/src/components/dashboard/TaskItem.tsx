import type { Task } from '../../types/Task';
import { useNavigate } from 'react-router-dom';
import { getPriority, getStatusColor } from './taskUtils';

interface TaskItemProps {
  task: Task;
  showStatus?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  showStatus = true,
}: TaskItemProps) => {
  const priority = getPriority(task.priority);
  const navigate = useNavigate();

  return (
    <div
      className={`transform transition-all duration-200 hover:scale-[1.02] m-2 rounded overflow-hidden w-60 h-90 flex flex-col ${priority.borderClass} ${priority.shadowClass}`}
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      {/* Card Header */}
      <div className={`${priority.headerClass} p-3 shrink-0`}>
        <h3 className="text-sm font-semibold text-white">{task.title}</h3>
      </div>

      {/* Card Body */}
      <div className="p-4 bg-white flex-1 overflow-y-auto">
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

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {task.description}
        </p>

        {showStatus && (
          <div className="p-3 bg-gray-50 border-t border-gray-200  mb-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)} transition-all duration-200 hover:scale-105 cursor-default inline-block`}
            >
              {task.status.replace('-', ' ')}
            </span>
          </div>
        )}

        {task.dueDate && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}

        {task.endDate && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            End: {new Date(task.endDate).toLocaleDateString()}
          </div>
        )}

        {!task.endDate && task.startDate && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Start: {new Date(task.startDate).toLocaleDateString()}
          </div>
        )}

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 text-right shrink-0">
        <div className="border-t border-gray-100 text-xs text-gray-400">
          Created {new Date(task.createdAt).toLocaleDateString()} by&nbsp;
          {task.createdBy.name}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
