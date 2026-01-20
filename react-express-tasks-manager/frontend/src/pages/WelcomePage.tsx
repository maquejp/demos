import { useUser } from '../contexts/UserContext';

const WelcomePage: React.FC = () => {
  const { currentUser } = useUser();
  return <div>Welcome, {currentUser?.name}</div>;
};

export default WelcomePage;
