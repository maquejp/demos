import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Stack,
  Typography,
  Divider,
  Alert,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import type { Task } from '../../types/Task';
import { tasksApi } from '../../services/tasksService';
import Loading from '../Loading';
import TagsList from './TagsList';

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
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
    }
  }, [id]);

  if (loading) return <Loading message="Loading task..." />;

  if (!loading && errors) {
    return <Alert severity="error">Error: {errors.join(', ')}</Alert>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement task save functionality
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = (e.target as HTMLInputElement).value.trim();
      if (newTag && task) {
        setTask({ ...task, tags: [...task.tags, newTag] });
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  const removeTag = (index: number) => {
    if (task) {
      const newTags = task.tags.filter((_, i) => i !== index);
      setTask({ ...task, tags: newTags });
    }
  };

  const removeUser = (userId: number) => {
    if (task) {
      const newUsers = task.assignedTo.filter((user) => user.id !== userId);
      setTask({ ...task, assignedTo: newUsers });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card>
        {/* Card Header */}
        <CardHeader
          title={task ? 'Edit Task' : 'Add New Task'}
          sx={{ borderBottom: 1, borderBottomColor: 'divider' }}
        />

        {/* Card Body */}
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              {/* Title */}
              <TextField
                fullWidth
                label="Title"
                required
                value={task?.title || ''}
                onChange={(e) =>
                  setTask((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev,
                  )
                }
              />

              {/* Description */}
              <TextField
                fullWidth
                label="Description"
                required
                multiline
                rows={4}
                value={task?.description || ''}
                onChange={(e) =>
                  setTask((prev) =>
                    prev ? { ...prev, description: e.target.value } : prev,
                  )
                }
              />

              {/* Status and Priority */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={task?.status || ''}
                    label="Status"
                    onChange={(e) =>
                      setTask((prev) =>
                        prev
                          ? {
                              ...prev,
                              status: e.target.value as Task['status'],
                            }
                          : prev,
                      )
                    }
                  >
                    <MenuItem value="todo">To Do</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={task?.priority || ''}
                    label="Priority"
                    onChange={(e) =>
                      setTask((prev) =>
                        prev
                          ? {
                              ...prev,
                              priority: e.target.value as Task['priority'],
                            }
                          : prev,
                      )
                    }
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              {/* Project */}
              <FormControl fullWidth>
                <InputLabel>Project</InputLabel>
                <Select
                  value={task?.projectId || ''}
                  label="Project"
                  onChange={(e) =>
                    setTask((prev) =>
                      prev
                        ? {
                            ...prev,
                            projectId: Number(
                              e.target.value,
                            ) as Task['projectId'],
                          }
                        : prev,
                    )
                  }
                >
                  <MenuItem value="">Standalone Task</MenuItem>
                </Select>
              </FormControl>

              {/* Duration (Start and End Date) */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Duration
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  sx={{ alignItems: 'center' }}
                >
                  <TextField
                    type="date"
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    value={task?.startDate ? task.startDate.split('T')[0] : ''}
                    onChange={(e) =>
                      setTask((prev) =>
                        prev ? { ...prev, startDate: e.target.value } : prev,
                      )
                    }
                    sx={{ flex: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    to
                  </Typography>
                  <TextField
                    type="date"
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    value={task?.endDate ? task.endDate.split('T')[0] : ''}
                    onChange={(e) =>
                      setTask((prev) =>
                        prev ? { ...prev, endDate: e.target.value } : prev,
                      )
                    }
                    sx={{ flex: 1 }}
                  />
                </Stack>
              </Box>

              {/* Due Date */}
              <TextField
                type="date"
                label="Due Date"
                InputLabelProps={{ shrink: true }}
                value={task?.dueDate ? task.dueDate.split('T')[0] : ''}
                onChange={(e) =>
                  setTask((prev) =>
                    prev ? { ...prev, dueDate: e.target.value } : prev,
                  )
                }
              />

              {/* Tags */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Tags
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Press Enter to add tag"
                  onKeyDown={(e) =>
                    addTag(e as React.KeyboardEvent<HTMLInputElement>)
                  }
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Box sx={{ mb: 2 }}>
                  <TagsList tags={task?.tags || []} onDelete={removeTag} />
                </Box>
              </Box>

              {/* Assigned Users */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Assigned Users
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Search and add user"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flexWrap: 'wrap', gap: 1 }}
                >
                  {task?.assignedTo.map((user) => (
                    <Chip
                      key={user.id}
                      label={`${user.name} (${user.email})`}
                      onDelete={() => removeUser(user.id)}
                      color="primary"
                      variant="filled"
                      sx={{
                        backgroundColor: 'primary.light',
                        color: 'primary.dark',
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Last Modified Info */}
              {task && task.updatedBy && (
                <>
                  <Divider />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textAlign: 'right' }}
                  >
                    Last modified{' '}
                    {new Date(task.updatedAt).toLocaleDateString()} by&nbsp;
                    <strong>{task.updatedBy.name}</strong>
                  </Typography>
                </>
              )}
            </Stack>
          </Box>
        </CardContent>

        {/* Card Footer */}
        <Divider />
        <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            size="small"
          >
            Save
          </Button>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate(`/tasks/${task?.id}`)}
            size="small"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default TaskForm;
