import React from 'react';
import type { User } from '../types/User';

export interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export type UserAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

export interface UserContextType extends UserState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  updateUser: (userData: User) => void;
  deleteUser: (userId: string) => void;
  refreshUsers: () => void;
}

export const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

export const userReducer = (
  state: UserState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined,
);
