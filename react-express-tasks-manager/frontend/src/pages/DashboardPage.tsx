import { useUser } from '../hooks/useUser';

const DashboardPage: React.FC = () => {
  const { currentUser } = useUser();
  return <div>Hello, {currentUser?.givenName}</div>;
};

export default DashboardPage;
