import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import type { Task } from '../../types/Task';

interface TaskHeaderProps {
  task: Task;
  currentUserId?: number;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
  task,
  currentUserId,
}: TaskHeaderProps) => {
  const theme = useTheme();
  const isYou = currentUserId === task.updatedBy.id;

  return (
    <Box
      sx={{
        p: 1.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
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
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isYou ? (
            <StarRoundedIcon
              fontSize="inherit"
              sx={{ color: theme.palette.app.gold }}
            />
          ) : (
            <PersonRoundedIcon fontSize="inherit" />
          )}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default TaskHeader;
