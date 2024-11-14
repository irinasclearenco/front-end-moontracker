import {useMutation, useQueryClient} from '@tanstack/react-query';
import {continueWithGoogle} from '../../services/api';
import * as SecureStore from 'expo-secure-store';
import {AxiosError, AxiosResponse} from 'axios';
import {GoogleData, SignInResponse} from '../../services/interfaces';

export const useContinueWithGoogle = () => {
  const queryClient = useQueryClient();
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<SignInResponse>,
    AxiosError<{message: string}>,
    GoogleData,
    unknown
  >({
    mutationFn: async data => continueWithGoogle(data),
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
