import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import { RootStackParamList } from '../../types/navigation';
import { loginValidationSchema } from '../../validation/loginValidation';
import { loginApiCall } from './loginService';
import { useAppDispatch } from '../../redux/store';
import { loginSuccess } from '../../redux/slices/authSlice';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const useLoginViewModel = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setAuthError('');
      try {
        const response = await loginApiCall(values.email, values.password);
        if (response.success && response.token) {
          dispatch(loginSuccess(response.token));
          navigation.replace('Events');
        } else {
          setAuthError(response.error || 'Authentication failed');
        }
      } catch (err) {
        setAuthError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return {
    email: formik.values.email,
    password: formik.values.password,
    emailError: (formik.touched.email && formik.errors.email) || authError,
    passwordError: formik.touched.password && formik.errors.password ? formik.errors.password : '',
    isLoading,
    onEmailChange: formik.handleChange('email'),
    onPasswordChange: formik.handleChange('password'),
    login: formik.handleSubmit,
  };
};


