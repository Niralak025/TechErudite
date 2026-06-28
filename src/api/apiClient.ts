import axios from 'axios';
import { store } from '../redux/store';
import { showLoader, hideLoader } from '../redux/slices/uiSlice';
import * as AxiosLogger from 'axios-logger';

const apiClient = axios.create({
  baseURL: 'https://techeruditestaging.com/projects/plie-api/public/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Show global loading indicator
    store.dispatch(showLoader());

    // Inject token if available
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return AxiosLogger.requestLogger(config);
  },
  (error) => {
    store.dispatch(hideLoader());
    return AxiosLogger.errorLogger(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Hide global loading indicator
    store.dispatch(hideLoader());
    return AxiosLogger.responseLogger(response);
  },
  (error) => {
    store.dispatch(hideLoader());
    return AxiosLogger.errorLogger(error);
  }
);

export default apiClient;
