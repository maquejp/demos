import type { Request, Response } from 'express';
import type { User, UserResponse, UsersResponse } from '@/models/User';

const users: User[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    role: 'user',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: 3,
    name: 'Mike Williams',
    email: 'mike@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    role: 'user',
    createdAt: '2024-01-03T00:00:00.000Z',
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    role: 'user',
    createdAt: '2024-01-04T00:00:00.000Z',
  },
];

export class UsersService {
  async getAll(_req: Request, _res: Response): Promise<UsersResponse> {
    return {
      status: 200,
      data: users,
    };
  }

  async getOne(req: Request, _res: Response): Promise<UserResponse> {
    if (!req.params.id) {
      return {
        status: 400,
        data: null,
      };
    }
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id) || null;
    return {
      status: 200,
      data: user,
    };
  }

  async getOneByEmail(req: Request, _res: Response): Promise<UserResponse> {
    if (!req.params.email) {
      return {
        status: 400,
        data: null,
      };
    }
    const email = req.params.email;
    const user = users.find((u) => u.email === email) || null;
    return {
      status: 200,
      data: user,
    };
  }
}
