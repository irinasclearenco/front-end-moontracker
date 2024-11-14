import axios, {AxiosInstance} from 'axios';
import * as SecureStore from 'expo-secure-store';
import {getItemAsync} from 'expo-secure-store';

import * as RootNavigation from './NavigationService';
import {baseUrl} from './consts';
import {routeNames} from '../constants/routeNames';

export const getRefreshToken = (refreshToken: string) => {
  return axios.get(`${baseUrl}/authentication/refresh-token`, {
    headers: {
      Authorization: 'Bearer ' + refreshToken,
    },
  });
};

const instance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const accessToken: string = await getItemAsync('access_token');
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401) {
        const refreshToken: string = await SecureStore.getItemAsync('refresh_token');
        try {
          await getRefreshToken(refreshToken).then(res => {
            SecureStore.setItemAsync('access_token', res.data.accessToken);
            SecureStore.setItemAsync('refresh_token', res.data.refreshToken);
            return instance(originalConfig);
          });
        } catch (error) {
          await SecureStore.deleteItemAsync('access_token');
          await SecureStore.deleteItemAsync('refresh_token');
          RootNavigation.navigate(routeNames.HOME);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
