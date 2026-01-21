import React, { useEffect, useReducer } from 'react';
import type { User } from '../types/User';
import { LocalStorageService } from '../services/localStorageService';
import {
  UserContext,
  type UserContextType,
  initialState,
  userReducer,
} from './userContext';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      const storedUsers = LocalStorageService.getUsers();

      // Only load users, not the current user (force fresh login)
      if (storedUsers) {
        dispatch({ type: 'SET_USERS', payload: storedUsers });
      }

      // Check if user should be remembered (optional)
      const rememberMe = localStorage.getItem(
        'react-express-tasks-manager-remember-me',
      );
      if (rememberMe === 'true') {
        const storedUser = LocalStorageService.getCurrentUser();
        if (storedUser) {
          dispatch({ type: 'SET_CURRENT_USER', payload: storedUser });
        }
      }
    }
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const users = LocalStorageService.getUsers();
      const user = users.find((u) => u.email === email);

      if (user) {
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        LocalStorageService.saveCurrentUser(user);
        return true;
      }
      return false;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Login failed',
      });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: 'SET_CURRENT_USER', payload: null });
    LocalStorageService.saveCurrentUser(null);
  };

  const register = async (
    userData: Omit<User, 'id' | 'createdAt'>,
  ): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const users = LocalStorageService.getUsers();

      if (users.some((u) => u.email === userData.email)) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'User with this email already exists',
        });
        return false;
      }

      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };

      const updatedUsers = [...users, newUser];
      LocalStorageService.saveUsers(updatedUsers);
      dispatch({ type: 'ADD_USER', payload: newUser });
      return true;
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Registration failed',
      });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateUser = (userData: User) => {
    const users = LocalStorageService.getUsers();
    const updatedUsers = users.map((user) =>
      user.id === userData.id ? userData : user,
    );
    LocalStorageService.saveUsers(updatedUsers);
    dispatch({ type: 'UPDATE_USER', payload: userData });

    if (state.currentUser?.id === userData.id) {
      dispatch({ type: 'SET_CURRENT_USER', payload: userData });
      LocalStorageService.saveCurrentUser(userData);
    }
  };

  const deleteUser = (userId: string) => {
    const users = LocalStorageService.getUsers();
    const updatedUsers = users.filter((user) => user.id !== userId);
    LocalStorageService.saveUsers(updatedUsers);
    dispatch({ type: 'DELETE_USER', payload: userId });

    if (state.currentUser?.id === userId) {
      logout();
    }
  };

  const refreshUsers = () => {
    const users = LocalStorageService.getUsers();
    dispatch({ type: 'SET_USERS', payload: users });
  };

  const value: UserContextType = {
    ...state,
    login,
    logout,
    register,
    updateUser,
    deleteUser,
    refreshUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
