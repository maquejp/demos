import type { User, UserResponse, UsersResponse } from "@/models/User";
import { logMessage } from "@/utils/logger";
import type { Request, Response } from "express";

export const users: User[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    role: "admin",
    createdAt: "2024-01-01T00:00:00.000Z",
    modifiedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    role: "user",
    createdAt: "2024-01-02T00:00:00.000Z",
    modifiedAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Mike Williams",
    email: "mike@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    role: "user",
    createdAt: "2024-01-03T00:00:00.000Z",
    modifiedAt: "2024-01-03T00:00:00.000Z",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    role: "user",
    createdAt: "2024-01-04T00:00:00.000Z",
    modifiedAt: "2024-01-04T00:00:00.000Z",
  },
];

export class UsersService {
  async getAll(req: Request, _res: Response): Promise<UsersResponse> {
    logMessage("Fetching all users", "info");
    let filteredUsers = users;

    // Filter by search query if provided
    if (req?.query.q) {
      filteredUsers = filteredUsers.filter((u) =>
        u.name
          .toLocaleLowerCase()
          .includes(String(req.query.q).toLocaleLowerCase()),
      );
    }

    // Exclude users by IDs if provided
    if (req?.query.ids) {
      const excludedIds = String(req.query.ids)
        .split(",")
        .map((id) => Number(id.trim()))
        .filter((id) => !isNaN(id));

      if (excludedIds.length > 0) {
        filteredUsers = filteredUsers.filter(
          (u) => !excludedIds.includes(u.id),
        );
      }
    }

    if (filteredUsers.length === 0) {
      return {
        status: 404,
        data: [],
      };
    }

    return {
      status: 200,
      data: filteredUsers,
    };
  }

  async getOne(req: Request, _res: Response): Promise<UserResponse> {
    logMessage(`Fetching user with id: ${req.params.id}`, "info");
    if (!req.params.id) {
      return {
        status: 400,
        data: null,
      };
    }
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id) || null;
    if (!user) {
      return {
        status: 404,
        data: null,
      };
    }
    return {
      status: 200,
      data: user,
    };
  }

  async getOneByEmail(req: Request, _res: Response): Promise<UserResponse> {
    logMessage(`Fetching user with email: ${req.params.email}`, "info");
    if (!req.params.email) {
      return {
        status: 400,
        data: null,
      };
    }
    const email = req.params.email;
    const user = users.find((u) => u.email === email) || null;
    if (!user) {
      return {
        status: 404,
        data: null,
      };
    }
    return {
      status: 200,
      data: user,
    };
  }
}
