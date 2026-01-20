import type { User } from '../types/User';
import usersData from '../data/users.json';

const STORAGE_KEYS = {
  USERS: 'react-express-tasks-manager-users',
  CURRENT_USER: 'react-express-tasks-manager-current-user',
} as const;

export class LocalStorageService {
  static getUsers(): User[] {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : this.getDefaultUsers();
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  static getCurrentUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  static saveCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  private static getDefaultUsers(): User[] {
    return usersData.map((user) => ({
      ...user,
      role: user.role as 'admin' | 'user',
      createdAt: new Date(user.createdAt),
    }));
  }
}
