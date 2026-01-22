import { useNavigate, useParams } from 'react-router-dom';

const TaskDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      TaskDetails for task ID: {id}
      <button
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default TaskDetails;
