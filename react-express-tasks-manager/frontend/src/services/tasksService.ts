import type { TasksResponse } from '../types/Task';

const BASE = '/api';

async function fetchAll(status: string): Promise<TasksResponse> {
  const response = await fetch(`${BASE}/tasks?status=${status}`);
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  const data: TasksResponse = await response.json();
  return data;
}

export const tasksApi = {
  fetchAll,
};
