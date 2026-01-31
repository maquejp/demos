import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateTask, useTask, useUpdateTask } from '../../hooks/useTasks';
import { useUser } from '../../hooks/useUser';
import { UsersService } from '../../services/usersService';
import type { Task, TaskUser } from '../../types/Task';
import type { User } from '../../types/User';
import { formatDate } from '../../utils/dateUtils';
import Loading from '../Loading';
import TagsList from './TagsList';

const TaskForm: React.FC = () => {
  const { currentUser } = useUser();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [userOptions, setUserOptions] = useState<TaskUser[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [userLoading, setUserLoading] = useState(false);

  const { data, isLoading, error } = useTask(id);
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();

  // Debounced fetch for users
  const fetchUsers = useRef(
    debounce(async (query: string, excludedIds: number[]) => {
      setUserLoading(true);
      try {
        const response = await UsersService.searchUsers(query, excludedIds);
        // Convert User[] to TaskUser[] by mapping to only needed properties
        const taskUsers: TaskUser[] = Array.isArray(response)
          ? response.map((user: User) => ({
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              role: user.role,
            }))
          : [];
        setUserOptions(taskUsers);
      } catch {
        setUserOptions([]);
      } finally {
        setUserLoading(false);
      }
    }, 400),
  ).current;

  useEffect(() => {
    if (userSearch.length > 0) {
      // Get IDs of already assigned users to exclude from results
      const excludedIds = task?.assignedTo.map((user) => user.id) || [];
      fetchUsers(userSearch, excludedIds);
    } else {
      setUserOptions([]);
    }
  }, [userSearch, fetchUsers, task?.assignedTo]);

  useEffect(() => {
    if (id && data) {
      setTask(data.data as Task);
    } else if (!id) {
      setTask({} as Task);
    }
  }, [id, data]);

  if (isLoading) return <Loading message="Loading task..." />;

  if (error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!id) {
      await handleCreate();
    } else {
      await handleUpdate();
    }
  };

  const handleCreate = async (): Promise<void> => {
    if (!task || !currentUser) return;

    // Set metadata before creating
    const createdBy: TaskUser = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      avatar: currentUser.avatar,
      role: currentUser.role,
    };

    const taskToCreate: Task = {
      ...task,
      createdBy,
      createdAt: new Date().toISOString(),
      updatedBy: createdBy,
      updatedAt: new Date().toISOString(),
    };

    createMutation.mutate(taskToCreate);
  };

  const handleUpdate = async (): Promise<void> => {
    if (!task || !currentUser) return;

    // Update metadata before saving
    const updatedBy: TaskUser = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      avatar: currentUser.avatar,
      role: currentUser.role,
    };

    const taskToSave: Task = {
      ...task,
      updatedBy,
      updatedAt: new Date().toISOString(),
    };

    updateMutation.mutate({ id: taskToSave.id, task: taskToSave });
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
                <Autocomplete
                  disableClearable
                  multiple
                  filterSelectedOptions
                  options={userOptions}
                  getOptionLabel={(option: TaskUser) =>
                    `${option.name} (${option.email})`
                  }
                  value={task?.assignedTo || []}
                  onChange={(_e, newValue) => {
                    setTask((prev) =>
                      prev ? { ...prev, assignedTo: newValue } : prev,
                    );
                  }}
                  onInputChange={(_e, value) => setUserSearch(value)}
                  loading={userLoading}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="Search and add user"
                      size="small"
                      sx={{ mb: 1 }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {userLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
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
                    Last modified {formatDate(task.updatedAt)} by&nbsp;
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
