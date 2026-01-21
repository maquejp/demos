import React, { useEffect, useState } from 'react';

import type { Task } from '../../types/Task';
import TaskItem from './TaskItem';
import { fetchTasks } from '../../services/tasksService';

interface TasksTableProps {
  context: string;
}

const TasksList: React.FC<TasksTableProps> = ({ context }: TasksTableProps) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [errors, setErrors] = useState<string[] | null>(null);
  useEffect(() => {
    fetchTasks()
      .then((tasks) => {
        // Handle the fetched tasks here
        setTasks(tasks.data);
        setLoading(false);
      })
      .catch((error) => {
        setErrors([error.message]);
        setLoading(false);
      });
  }, []);
  // Convert date strings from JSON to Date objects
  const allTaskList: Task[] = tasks.map((task) => ({
    ...task,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
    startDate: task.startDate ? new Date(task.startDate) : undefined,
    endDate: task.endDate ? new Date(task.endDate) : undefined,
    dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
  })) as Task[];

  const contextData: Task[] = allTaskList.filter(
    (task) => task.status === context,
  );

  if (loading) return <p>Loading tasks...</p>;
  if (!loading && errors) return <p>Error: {errors.join(', ')}</p>;
  return (
    <div>
      <div>
        <div className="flex flex-wrap">
          {contextData.length === 0 && (
            <p className="m-4 p-2">No tasks available in this category.</p>
          )}
          {contextData.map((task, i) => (
            <div>
              <TaskItem key={i} task={task} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksList;
