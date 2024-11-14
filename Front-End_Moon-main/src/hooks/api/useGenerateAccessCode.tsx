import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {generateAccessCode} from '../../services/api';

export const useGenerateAccessCode = () => {
  const queryClient = useQueryClient();
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<any>,
    AxiosError<{message: string}>,
    any,
    unknown
  >({
    mutationFn: async id => generateAccessCode(id),
    onSuccess: async (_, b: {receiverId: string}) => {
      await queryClient.invalidateQueries({queryKey: [`profile`]});
    },
  });
  return {
    mutateAsync,
    error: error?.response?.data.message,
    isPending,
  };
};
