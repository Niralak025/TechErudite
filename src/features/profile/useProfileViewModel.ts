import { useCallback } from 'react';
import * as Keychain from 'react-native-keychain';
import { logoutSuccess } from '../../redux/slices/authSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';

export const useProfileViewModel = () => {
  const dispatch = useAppDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const greeting = `Hello ${userInfo?.usr_fname ?? ''}!`;

  const handleLogout = useCallback(async () => {
    try {
      await Keychain.resetGenericPassword();
      dispatch(logoutSuccess());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [dispatch]);

  return {
    handleLogout,
    greeting,
  };
};
