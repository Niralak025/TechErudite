import apiClient from '../../api/apiClient';
import { API_ENDPOINTS } from '../../api/apiServices';
import { LoginResponse } from '../../types/loginTypes';

export const loginApiCall = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    // Execute direct API call using configured endpoint
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      if (response.data?.success) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
          token: response.data.data?.token,
        };
      }
    }

    return {
      success: false,
      error: response.data?.message || 'Invalid server response code',
    };
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message;
    return {
      success: false,
      error: errorMsg || 'API request failed',
    };
  }
};
