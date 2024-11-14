import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {createPost} from '../../services/api';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<any>,
    AxiosError<{message: string}>,
    any,
    unknown
  >({
    mutationFn: async data => createPost(data),
    onSuccess: async (_, b: {receiverId: string}) => {
      await queryClient.invalidateQueries({queryKey: ['posts']});
    },
  });
  return {
    mutateAsync,
    error: error?.response?.data.message,
    isPending,
  };
};
