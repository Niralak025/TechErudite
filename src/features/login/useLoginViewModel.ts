import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { loginValidationSchema } from '../../validation/loginValidation';
import { loginApiCall } from './loginService';
import { useAppDispatch } from '../../redux/store';
import { loginSuccess } from '../../redux/slices/authSlice';
import * as Keychain from 'react-native-keychain';

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export const useLoginViewModel = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    setAuthError('');
    try {
      const response = await loginApiCall(values.email, values.password);
      if (response.success && response.token) {
        await Keychain.setGenericPassword('token', response.token);
        dispatch(
          loginSuccess({ token: response.token, user: response.data?.user }),
        );
      } else {
        setAuthError(response.error || 'Authentication failed');
      }
    } catch (err) {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  return {
    isLoading,
    authError,
    handleLogin,
    isPasswordVisible,
    togglePasswordVisibility,
  };
};
