import type { Task } from '../../types/Task';

interface TaskHeaderProps {
  task: Task;
  headerClass: string;
  currentUserId?: number;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
  task,
  headerClass,
  currentUserId,
}: TaskHeaderProps) => {
  const isYou = currentUserId === task.updatedBy.id;
  return (
    <div
      className={`${headerClass} p-3 flex flex-row justify-between items-center`}
    >
      <h3 className="text-sm font-semibold text-white" title={task.title}>
        {task.title}
      </h3>
      <p
        className="text-xs text-white cursor-pointer"
        title={isYou ? 'You' : task.updatedBy.name}
      >
        {isYou ? '⭐' : '👤'}
      </p>
    </div>
  );
};

export default TaskHeader;
