import type { Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
}

const getStatusColor = (status: Task['status']) => {
  switch (status) {
    case 'todo':
      return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'in-progress':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'completed':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'cancelled':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getPriorityClass = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'priority-high';
    case 'medium':
      return 'priority-medium';
    case 'low':
      return 'priority-low';
    default:
      return 'priority-medium';
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ task }: TaskItemProps) => {
  return (
    <div
      className={`transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg m-2 p-4 border  rounded mb-2 w-50 h-50 ${getStatusColor(task.status)} ${getPriorityClass(task.priority)}`}
    >
      <p>{task.id}</p>
      <p>{task.status}</p>
      <p>{task.description}</p>
      <p>{task.dueDate?.toLocaleDateString()}</p>
    </div>
  );
};

export default TaskItem;
