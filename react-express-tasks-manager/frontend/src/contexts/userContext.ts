import React from 'react';
import type { User } from '../types/User';

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export type UserAction =
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

export interface UserContextType extends UserState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userReducer = (
  state: UserState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
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
