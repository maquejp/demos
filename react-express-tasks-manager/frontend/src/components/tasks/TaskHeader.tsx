import { Box, Typography, Tooltip } from '@mui/material';
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
    <Box
      sx={{
        p: 1.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        color: 'white',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: 'inherit',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={task.title}
      >
        {task.title}
      </Typography>
      <Tooltip title={isYou ? 'You' : task.updatedBy.name}>
        <Typography
          variant="body2"
          sx={{
            cursor: 'pointer',
            ml: 1,
            fontSize: '1.125rem',
            flexShrink: 0,
          }}
        >
          {isYou ? '⭐' : '👤'}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default TaskHeader;
