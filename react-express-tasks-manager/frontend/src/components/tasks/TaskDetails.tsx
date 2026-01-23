import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Button,
  Typography,
  Chip,
  Stack,
  Alert,
  Divider,
  useTheme,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Task } from '../../types/Task';
import { tasksApi } from '../../services/tasksService';
import { getPriority, getStatusColor } from './taskUtils';
import Loading from '../Loading';
import { useUser } from '../../hooks/useUser';
import TaskHeader from './TaskHeader';
import TagsList from './TagsList';

const TaskDetails: React.FC = () => {
  const { currentUser } = useUser();
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task | null>(null);
  const [errors, setErrors] = useState<string[] | null>(null);

  useEffect(() => {
    if (!id) return;
    tasksApi
      .fetchOne(id)
      .then((response) => {
        setTask(response.data as Task);
        setLoading(false);
      })
      .catch((error) => {
        setErrors([error.message]);
        setLoading(false);
      });
  }, [id]);

  if (!id) {
    return <Alert severity="error">Invalid task ID.</Alert>;
  }

  if (loading) return <Loading message="Loading task details..." />;

  if (!loading && errors) {
    return <Alert severity="error">Error: {errors.join(', ')}</Alert>;
  }

  if (!task) {
    return <Alert severity="warning">Task not found.</Alert>;
  }

  const priority = getPriority(task.priority);

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          borderLeft: `4px solid ${priority.color || theme.palette.primary.main}`,
        }}
      >
        {/* Card Header */}
        <TaskHeader task={task} currentUserId={currentUser?.id} />

        {/* Card Body */}
        <CardContent>
          {task.projectId && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Project ID: {task.projectId}
              </Typography>
            </Box>
          )}
          {!task.projectId && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Standalone task
              </Typography>
            </Box>
          )}

          <Typography
            variant="body1"
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

          <Box sx={{ mb: 2 }}>
            <Chip
              label={task.status.replace('-', ' ')}
              color={getStatusColor(task.status)}
              variant="outlined"
            />
          </Box>

          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EventIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Due:{' '}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EventIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Start:{' '}
                {task.startDate
                  ? new Date(task.startDate).toLocaleDateString()
                  : 'N/A'}
              </Typography>
            </Box>
          </Stack>

          {task.tags.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <TagsList tags={task.tags} />
            </Box>
          )}

          {task.updatedBy && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                Last modified {new Date(task.updatedAt).toLocaleDateString()}{' '}
                by&nbsp;
                <strong>{task.updatedBy.name}</strong>
              </Typography>
            </>
          )}
        </CardContent>

        {/* Card Footer */}
        <Divider />
        <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/tasks/${task.id}/edit`)}
            size="small"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            size="small"
          >
            Back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default TaskDetails;
