import { useCallback } from 'react';
import {
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation
} from '../../api/endpoints/authApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutAction, setCredentials } from '../../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [resetPasswordMutation, { isLoading: isResetLoading }] = useResetPasswordMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const login = useCallback(async (dni: string, password: string) => {
    try {
      const result = await loginMutation({ dni, password }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.access_token }));
      return result;
    } catch (error) {
      throw error;
    }
  }, [loginMutation, dispatch]);

  const resetPassword = useCallback(async (dni: string) => {
    try {
      const result = await resetPasswordMutation({ dni }).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  }, [resetPasswordMutation]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      dispatch(logoutAction());
    }
  }, [logoutMutation, dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoginLoading || isResetLoading || isLogoutLoading,
    login,
    resetPassword,
    logout,
  };
};
