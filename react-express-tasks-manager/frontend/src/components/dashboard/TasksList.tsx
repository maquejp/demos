import type { Task } from '../../types/Task';
import TaskItem from './TaskItem';
import tasksData from '../../data/tasks.json';

interface TasksTableProps {
  context: string;
}

const TasksList: React.FC<TasksTableProps> = ({ context }: TasksTableProps) => {
  // Convert date strings from JSON to Date objects
  const allTaskList: Task[] = tasksData.map((task) => ({
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
