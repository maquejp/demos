export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
  createdAt: string;
  modifiedAt: string;
}

export interface UsersResponse {
  status: number;
  data: User[];
}

export interface UserResponse {
  status: number;
  data: User | null;
}
