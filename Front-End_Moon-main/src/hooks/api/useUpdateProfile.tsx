import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateProfile} from '../../services/api';
import {AxiosError, AxiosResponse} from 'axios';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<any>,
    AxiosError<{message: string}>,
    any,
    unknown
  >({
    mutationFn: async data => updateProfile(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['profile']});
    },
  });
  return {
    mutateAsync,
    error: error?.response?.data.message,
    isPending,
  };
};
