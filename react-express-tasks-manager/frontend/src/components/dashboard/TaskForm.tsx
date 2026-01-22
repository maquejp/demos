import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Task } from '../../types/Task';
import { tasksApi } from '../../services/tasksService';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
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
    }
  }, [id]);
  if (loading) return <p>Loading tasks...</p>;
  if (!loading && errors) return <p>Error: {errors.join(', ')}</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send formData to the backend API
    console.log(task);
  };

  return (
    <div>
      <div
        className={`transform transition-all duration-200 m-2 rounded overflow-hidden w-full h-full flex flex-col }`}
      >
        {/* Card Header */}
        <div className="p-4 bg-white border-b border-gray-500">
          <h3 className="text-sm font-semibold">
            {task ? 'Edit Task' : 'Add New Task'}
          </h3>
        </div>

        {/* Card Body */}
        <div className="p-4 bg-white flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={task?.title || ''}
                onChange={(e) =>
                  setTask((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev,
                  )
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <input
                type="text"
                value={task?.description || ''}
                onChange={(e) =>
                  setTask((prev) =>
                    prev ? { ...prev, description: e.target.value } : prev,
                  )
                }
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={task?.status || ''}
                  onChange={(e) =>
                    setTask((prev) =>
                      prev
                        ? { ...prev, status: e.target.value as Task['status'] }
                        : prev,
                    )
                  }
                  className="input-field"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={task?.priority || ''}
                  onChange={(e) =>
                    setTask((prev) =>
                      prev
                        ? {
                            ...prev,
                            priority: e.target.value as Task['priority'],
                          }
                        : prev,
                    )
                  }
                  className="input-field"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project
                </label>
                <select
                  value={task?.projectId || ''}
                  onChange={(e) =>
                    setTask((prev) =>
                      prev
                        ? {
                            ...prev,
                            projectId: e.target.value as Task['projectId'],
                          }
                        : prev,
                    )
                  }
                  className="input-field"
                >
                  <option value="">Standalone Task</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={task?.startDate ? task.startDate.split('T')[0] : ''}
                    onChange={(e) =>
                      setTask((prev) =>
                        prev ? { ...prev, startDate: e.target.value } : prev,
                      )
                    }
                    className="input-field"
                    placeholder="Start Date"
                  />
                  <span className="flex items-center text-gray-500">to</span>
                  <input
                    type="date"
                    value={task?.endDate ? task.endDate.split('T')[0] : ''}
                    onChange={(e) =>
                      setTask((prev) =>
                        prev ? { ...prev, endDate: e.target.value } : prev,
                      )
                    }
                    className="input-field"
                    placeholder="End Date"
                  />
                </div>
              </div>{' '}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={task?.dueDate ? task.dueDate.split('T')[0] : ''}
                  onChange={(e) =>
                    setTask((prev) =>
                      prev ? { ...prev, dueDate: e.target.value } : prev,
                    )
                  }
                  className="input-field"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Card Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-right shrink-0 flex justify-between">
          <button
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            onClick={() => navigate(`/`)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
