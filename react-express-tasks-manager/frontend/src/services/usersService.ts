import type { UserResponse } from '../types/User';

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
}
