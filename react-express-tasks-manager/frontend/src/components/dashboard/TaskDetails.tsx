import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Task } from '../../types/Task';
import { tasksApi } from '../../services/tasksService';
import { getPriority } from './taskUtils';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);
  const [errors, setErrors] = useState<string[] | null>(null);

  useEffect(() => {
    if (!id) return;
    tasksApi
      .fetchOne(id)
      .then((response) => {
        setTask(response.data as Task);
        setLoading(false);
      })
      .catch((error) => {
        setErrors([error.message]);
        setLoading(false);
      });
  }, [id]);
  if (!id) {
    return <p>Invalid task ID.</p>;
  }
  if (loading) return <p>Loading tasks...</p>;
  if (!loading && errors) return <p>Error: {errors.join(', ')}</p>;
  if (!task) {
    return <p>Task not found.</p>;
  }
  return (
    <div>
      <div
        className={`transform transition-all duration-200 hover:scale-[1.02] m-2 rounded overflow-hidden w-full h-80 flex flex-col ${getPriority(task.priority).borderClass} ${getPriority(task.priority).shadowClass}`}
      >
        {/* Card Header */}
        <div
          className={`${getPriority(task.priority).headerClass} p-3 shrink-0`}
        >
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

          <div className="mb-3">
            <span>{task.status.replace('-', ' ')}</span>
          </div>

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
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-right shrink-0 flex justify-center gap-4">
          <button
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            Save
          </button>
          <button
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
