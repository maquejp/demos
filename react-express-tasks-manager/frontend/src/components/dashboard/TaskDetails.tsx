import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Task } from '../../types/Task';
import { tasksApi } from '../../services/tasksService';

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
  return (
    <div>
      TaskDetails for task ID: {id} {task ? `- ${task.title}` : ''}
      <button
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default TaskDetails;
