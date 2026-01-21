import type { Task } from '../../types/Task';

interface TaskItemProps {
  item: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ item }: TaskItemProps) => {
  return (
    <div>
      <p>{item.id}</p>
    </div>
  );
};

export default TaskItem;
