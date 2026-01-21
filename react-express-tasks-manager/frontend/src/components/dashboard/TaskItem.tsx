import type { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }: TaskItemProps) => {
  return (
    <div className="m-2 p-4 border border-gray-300 rounded mb-2 w-1/2">
      <p>{task.id}</p>
      <p>{task.status}</p>
      <p>{task.description}</p>
      <p>{task.dueDate?.toLocaleDateString()}</p>
    </div>
  );
};

export default TaskItem;
