import type { Task, TaskResponse, TasksResponse } from '../types/Task';

const BASE = '/api';

async function fetchAll(status: string): Promise<TasksResponse> {
  const response = await fetch(`${BASE}/tasks?status=${status}`);
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  const data: TasksResponse = await response.json();
  return data;
}

async function fetchOne(id: string): Promise<TaskResponse> {
  const response = await fetch(`${BASE}/tasks/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.statusText}`);
  }
  const data: TaskResponse = await response.json();
  return data;
}

async function update(id: number, task: Task): Promise<TaskResponse> {
  const response = await fetch(`${BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Error updating task: ${response.statusText}`);
  }
  const data: TaskResponse = await response.json();
  return data;
}

async function create(task: Task): Promise<TaskResponse> {
  const response = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Error creating task: ${response.statusText}`);
  }
  const data: TaskResponse = await response.json();
  return data;
}

export const tasksApi = {
  fetchAll,
  fetchOne,
  update,
  create,
};
