import {useMutation, useQueryClient} from '@tanstack/react-query';
import {signUp} from '../../services/api';
import {SignInParams, SignInResponse, SignUpParams} from '../../services/interfaces';
import {AxiosError, AxiosResponse} from 'axios';
import * as SecureStore from 'expo-secure-store';

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<SignInResponse>,
    AxiosError<{message: string}>,
    SignInParams,
    unknown
  >({
    mutationFn: async ({email, password}: SignUpParams) => signUp(email, password),
    onSuccess: async ({data}) => {
      await SecureStore.setItemAsync('access_token', data.accessToken);
      await SecureStore.setItemAsync('refresh_token', data.refreshToken);
      await queryClient.invalidateQueries({queryKey: ['profile']});
    },
  });
  return {
    mutateAsync,
    error: error?.response?.data?.message,
    isPending,
  };
};
