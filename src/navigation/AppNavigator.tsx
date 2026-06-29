import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import { RootStackParamList } from '../types/navigation';
import LoginScreen from '../features/login/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { loginSuccess } from '../redux/slices/authSlice';
import { COLORS } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = (): React.JSX.Element => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.username === 'token') {
          dispatch(loginSuccess({ token: credentials.password }));
        }
      } catch (error) {
        console.error('Keychain error:', error);
      } finally {
        setIsReady(true);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.backgroundLight,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.green} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="MainTab" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
