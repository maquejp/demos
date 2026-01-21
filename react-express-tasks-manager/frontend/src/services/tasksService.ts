import type { TasksResponse } from '../types/Task';

export async function fetchTasks(context: string): Promise<TasksResponse> {
  const response = await fetch(`/api/tasks?context=${context}`);
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  const data: TasksResponse = await response.json();
  return data;
}
