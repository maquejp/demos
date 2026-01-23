import type { Task } from '../../types/Task';
import { useNavigate } from 'react-router-dom';
import { getPriority, getStatusColor } from './taskUtils';
import { useUser } from '../../hooks/useUser';
import TaskHeader from './TaskHeader';

interface TaskItemProps {
  task: Task;
  showStatus?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  showStatus = true,
}: TaskItemProps) => {
  const { currentUser } = useUser();
  const priority = getPriority(task.priority);
  const navigate = useNavigate();

  return (
    <div
      className={`cursor-pointer transform transition-all duration-200 hover:scale-[1.02] m-2 rounded overflow-hidden w-70 h-100 flex flex-col ${priority.borderClass} ${priority.shadowClass}`}
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      {/* Card Header */}
      <TaskHeader
        task={task}
        headerClass={priority.headerClass}
        currentUserId={currentUser?.id}
      />

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
                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full bg-blue-100 flex items-center"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 text-right shrink-0">
        <div className="border-t border-gray-100 text-xs text-gray-400">
          Last modified {new Date(task.updatedAt).toLocaleDateString()}
          <br /> by&nbsp;{task.updatedBy.name}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
