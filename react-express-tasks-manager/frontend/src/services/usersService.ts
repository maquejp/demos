import type { UserResponse, User } from '../types/User';

const API_BASE_URL = '/api';

export class UsersService {
  static async getUserByEmail(email: string): Promise<UserResponse> {
    const response = await fetch(`${API_BASE_URL}/users/email/${email}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    const data: UserResponse = await response.json();
    return data;
  }

  static async searchUsers(query: string): Promise<User[]> {
    const response = await fetch(
      `${API_BASE_URL}/users?q=${encodeURIComponent(query)}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to search users: ${response.statusText}`);
    }
    const data: User[] = await response.json();
    return data;
  }
}
