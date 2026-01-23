import React, { useEffect, useState } from 'react';

import type { Task } from '../../types/Task';
import TaskItem from './TaskItem';
import { tasksApi } from '../../services/tasksService';
import Loading from '../Loading';

interface TasksTableProps {
  status: string;
}

const TasksList: React.FC<TasksTableProps> = ({ status }: TasksTableProps) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errors, setErrors] = useState<string[] | null>(null);
  useEffect(() => {
    tasksApi
      .fetchAll(status)
      .then((response) => {
        setTasks(response.data as Task[]);
        setLoading(false);
      })
      .catch((error) => {
        setErrors([error.message]);
        setLoading(false);
      });
  }, [status]);

  if (loading) return <Loading message="Loading tasks..." />;
  if (!loading && errors) return <p>Error: {errors.join(', ')}</p>;
  return (
    <div>
      <div>
        <div className="flex flex-wrap">
          {tasks.length === 0 && (
            <p className="m-4 p-2">No tasks available in this category.</p>
          )}
          {tasks.map((task, i) => (
            <div key={i}>
              <TaskItem task={task} showStatus={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksList;
