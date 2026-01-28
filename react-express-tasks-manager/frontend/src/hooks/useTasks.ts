import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { TasksService } from '../services/tasksService';
import type { Task } from '../types/Task';

// Query hook to fetch all tasks by status
export const useTasks = (status: string) => {
  return useQuery({
    queryKey: ['tasks', status],
    queryFn: () => TasksService.fetchAll(status),
  });
};

// Query hook to fetch a single task
export const useTask = (id: string | undefined) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => TasksService.fetchOne(id!),
    enabled: !!id,
  });
};

// Mutation hook to create a task
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newTask: Task) => TasksService.create(newTask),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate(`/tasks/${response.data?.id}`);
    },
  });
};

// Mutation hook to update a task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: Task }) =>
      TasksService.update(id, task),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({
        queryKey: ['task', variables.id.toString()],
      });
      navigate(`/tasks/${variables.id}`);
    },
  });
};
