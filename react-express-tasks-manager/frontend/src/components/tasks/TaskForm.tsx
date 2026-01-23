import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Task } from '../../types/Task';
import { tasksApi } from '../../services/tasksService';
import Loading from '../Loading';

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
  if (loading) return <Loading message="Loading task..." />;
  if (!loading && errors) return <p>Error: {errors.join(', ')}</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send formData to the backend API
    console.log(task);
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = (e.target as HTMLInputElement).value.trim();
      if (newTag && task) {
        setTask({ ...task, tags: [...task.tags, newTag] });
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  const removeTag = (index: number) => {
    if (task) {
      const newTags = task.tags.filter((_, i) => i !== index);
      setTask({ ...task, tags: newTags });
    }
  };

  const removeUser = (userId: number) => {
    if (task) {
      const newUsers = task.assignedTo.filter((user) => user.id !== userId);
      setTask({ ...task, assignedTo: newUsers });
    }
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
              <textarea
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
            <div>
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
                            projectId: Number(
                              e.target.value,
                            ) as Task['projectId'],
                          }
                        : prev,
                    )
                  }
                  className="input-field"
                >
                  <option value="">Standalone Task</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  onKeyDown={(e) => addTag(e)}
                  placeholder="Press Enter to add tag"
                  className="input-field flex-1"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {task?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full bg-blue-100 flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        removeTag(index);
                      }}
                      className="ml-1 text-primary-500 hover:text-primary-700 cursor-pointer"
                      data-index={index}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned users
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search and add user"
                  className="input-field flex-1"
                />
              </div>
              <div className="mt-2 flex gap-1">
                {task?.assignedTo.map((user) => (
                  <span
                    key={user.id}
                    className="px-2 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full bg-blue-100 flex items-center"
                  >
                    {user.name} ({user.email})
                    <button
                      type="button"
                      onClick={() => {
                        removeUser(user.id);
                      }}
                      className="ml-1 text-primary-700 cursor-pointer"
                      data-index={user.id}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            {task && task.updatedBy && (
              <div className="text-xs text-gray-400 w-full border-t border-gray-100 pt-2 flex justify-end">
                <p>
                  Last modified {new Date(task.updatedAt).toLocaleDateString()}
                  &nbsp; by&nbsp;
                  {task.updatedBy.name}
                </p>
              </div>
            )}
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
            onClick={() => navigate(`/tasks/${task?.id}`)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
