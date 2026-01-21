import { useUser } from '../hooks/useUser';
import TasksNavigation from './dashboard/TasksNavigation';

const Dashboard: React.FC = () => {
  const { currentUser } = useUser();
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">
        Welcome, {currentUser?.givenName}
      </h1>
      <TasksNavigation />
    </div>
  );
};

export default Dashboard;
