import EventIcon from '@mui/icons-material/Event';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import type { Task } from '../../types/Task';
import { formatDate } from '../../utils/dateUtils';
import TagsList from './TagsList';
import TaskHeader from './TaskHeader';
import { getPriorityColor, getStatusColorMap } from './taskUtils';

interface TaskItemProps {
  task: Task;
  showStatus?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  showStatus = true,
}: TaskItemProps) => {
  const { currentUser } = useUser();
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
        borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
      }}
    >
      {/* Card Header */}
      <TaskHeader task={task} currentUserId={currentUser?.id} />

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
              color={getStatusColorMap()[task.status]}
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
                Due: {formatDate(task.dueDate)}
              </Typography>
            </Box>
          )}

          {task.endDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <EventIcon
                sx={{ width: 16, height: 16, color: 'text.secondary' }}
              />
              <Typography variant="caption" color="text.secondary">
                End: {formatDate(task.endDate)}
              </Typography>
            </Box>
          )}

          {!task.endDate && task.startDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <EventIcon
                sx={{ width: 16, height: 16, color: 'text.secondary' }}
              />
              <Typography variant="caption" color="text.secondary">
                Start: {formatDate(task.startDate)}
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
          Last modified {formatDate(task.updatedAt)}
          <br /> by&nbsp;{task.updatedBy.name}
        </Typography>
      </Box>
    </Card>
  );
};

export default TaskItem;
