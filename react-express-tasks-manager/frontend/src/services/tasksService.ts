import type { TasksResponse } from '../types/Task';

export async function fetchTasks(): Promise<TasksResponse> {
  const response = await fetch('/api/tasks');
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  const data: TasksResponse = await response.json();
  return data;
}
