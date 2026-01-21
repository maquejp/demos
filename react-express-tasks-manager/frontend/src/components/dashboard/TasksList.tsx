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
    fetchTasks(context)
      .then((response) => {
        const taskArray = Array.isArray(response) ? response : response.data;
        const allTaskList: Task[] = (taskArray || []).map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          startDate: task.startDate ? new Date(task.startDate) : undefined,
          endDate: task.endDate ? new Date(task.endDate) : undefined,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        })) as Task[];
        setTasks(allTaskList);
        setLoading(false);
      })
      .catch((error) => {
        setErrors([error.message]);
        setLoading(false);
      });
  }, [context]);

  if (loading) return <p>Loading tasks...</p>;
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
              <TaskItem task={task} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksList;
