import { API_BASE_URL } from '../config/api';
import type { Task, TaskResponse, TasksResponse } from '../types/Task';

export class TasksService {
  static async fetchAll(status: string): Promise<TasksResponse> {
    const response = await fetch(`${API_BASE_URL}/tasks?status=${status}`);
    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    const data: TasksResponse = await response.json();
    return data;
  }

  static async fetchOne(id: string): Promise<TaskResponse> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.statusText}`);
    }
    const data: TaskResponse = await response.json();
    return data;
  }

  static async update(id: number, task: Task): Promise<TaskResponse> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
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

  static async create(task: Task): Promise<TaskResponse> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
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
}
