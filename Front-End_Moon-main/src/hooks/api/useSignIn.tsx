import {useMutation, useQueryClient} from '@tanstack/react-query';
import {signIn} from '../../services/api';
import {SignInParams, SignInResponse} from '../../services/interfaces';
import * as SecureStore from 'expo-secure-store';
import {AxiosError, AxiosResponse} from 'axios';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<SignInResponse>,
    AxiosError<{message: string}>,
    SignInParams,
    unknown
  >({
    mutationFn: async ({email, password}: SignInParams) => signIn(email, password),
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
