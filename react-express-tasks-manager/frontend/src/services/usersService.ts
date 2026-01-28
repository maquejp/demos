import { API_BASE_URL } from '../config/api';
import type { User, UserResponse } from '../types/User';

export class UsersService {
  static async getUserByEmail(email: string): Promise<UserResponse> {
    const response = await fetch(`${API_BASE_URL}/users/email/${email}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    const data: UserResponse = await response.json();
    return data;
  }

  static async searchUsers(
    query: string,
    excludedIds?: number[],
  ): Promise<User[]> {
    let url = `${API_BASE_URL}/users?q=${encodeURIComponent(query)}`;

    // Add excluded IDs as query parameter if provided
    if (excludedIds && excludedIds.length > 0) {
      url += `&ids=${excludedIds.join(',')}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to search users: ${response.statusText}`);
    }
    const responseData = await response.json();
    // Extract data from the response wrapper
    return responseData.data || [];
  }
}
