import type { Task } from '../../types/Task';
import { useNavigate } from 'react-router-dom';
import { getPriority, getStatusColor } from './taskUtils';
import { useUser } from '../../hooks/useUser';
import TaskHeader from './TaskHeader';
import TagsList from './TagsList';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

interface TaskItemProps {
  task: Task;
  showStatus?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  showStatus = true,
}: TaskItemProps) => {
  const { currentUser } = useUser();
  const priority = getPriority(task.priority);
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/tasks/${task.id}`)}
      sx={{
        cursor: 'pointer',
        transform: 'scale(1)',
        transition: 'all 200ms ease-in-out',
        m: 1,
        width: 280,
        height: 'auto',
        maxHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 3,
        },
        borderLeft: `4px solid ${priority.color || '#3b82f6'}`,
      }}
    >
      {/* Card Header */}
      <TaskHeader
        task={task}
        headerClass={priority.headerClass}
        currentUserId={currentUser?.id}
      />

      {/* Card Body */}
      <CardContent sx={{ flex: 1, overflowY: 'auto', pb: 1 }}>
        {task.projectId && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Project ID: {task.projectId}
            </Typography>
          </Box>
        )}
        {!task.projectId && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Standalone task
            </Typography>
          </Box>
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {task.description}
        </Typography>

        {showStatus && (
          <Box
            sx={{
              p: 1.5,
              backgroundColor: 'action.hover',
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Chip
              label={task.status.replace('-', ' ')}
              size="small"
              color={getStatusColor(task.status)}
              variant="outlined"
            />
          </Box>
        )}

        <Stack spacing={1} sx={{ mb: 2 }}>
          {task.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <EventIcon
                sx={{ width: 16, height: 16, color: 'text.secondary' }}
              />
              <Typography variant="caption" color="text.secondary">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}

          {task.endDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <EventIcon
                sx={{ width: 16, height: 16, color: 'text.secondary' }}
              />
              <Typography variant="caption" color="text.secondary">
                End: {new Date(task.endDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}

          {!task.endDate && task.startDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <EventIcon
                sx={{ width: 16, height: 16, color: 'text.secondary' }}
              />
              <Typography variant="caption" color="text.secondary">
                Start: {new Date(task.startDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </Stack>

        {task.tags.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <TagsList tags={task.tags} />
          </Box>
        )}
      </CardContent>

      {/* Card Footer */}
      <Divider />
      <Box
        sx={{
          p: 1.5,
          backgroundColor: 'action.hover',
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Last modified {new Date(task.updatedAt).toLocaleDateString()}
          <br /> by&nbsp;{task.updatedBy.name}
        </Typography>
      </Box>
    </Card>
  );
};

export default TaskItem;
