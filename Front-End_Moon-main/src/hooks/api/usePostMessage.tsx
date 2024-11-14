import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {postMessage} from '../../services/api';

export const usePostMessage = () => {
  const queryClient = useQueryClient();
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<any>,
    AxiosError<{message: string}>,
    any,
    unknown
  >({
    mutationFn: async data => postMessage(data),
    onSuccess: async (_, b: {receiverId: string}) => {
      await queryClient.invalidateQueries({queryKey: [`messages-${b.receiverId}`]});
      await queryClient.invalidateQueries({queryKey: ['chatList']});
    },
  });
  return {
    mutateAsync,
    error: error?.response?.data.message,
    isPending,
  };
};
