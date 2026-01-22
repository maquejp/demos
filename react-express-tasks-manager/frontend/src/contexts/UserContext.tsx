import React, { useReducer } from 'react';
import { LocalStorageService } from '../services/localStorageService';
import { UsersService } from '../services/usersService';
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

  const login = async (email: string, _password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await UsersService.getUserByEmail(email);
      const user = response.data;

      if (user) {
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        return true;
      }
      dispatch({
        type: 'SET_ERROR',
        payload: 'User not found',
      });
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
    LocalStorageService.clearRememberMe();
  };

  const value: UserContextType = {
    ...state,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
