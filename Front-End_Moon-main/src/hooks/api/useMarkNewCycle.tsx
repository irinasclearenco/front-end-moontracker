import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {markStartCycle} from '../../services/api';

export const useMarkNewCycle = () => {
  const queryClient = useQueryClient();
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<any>,
    AxiosError<{message: string}>,
    any,
    unknown
  >({
    mutationFn: async startCycleDay => markStartCycle(startCycleDay),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['cycles']});
    },
  });
  return {
    mutateAsync,
    error: error?.response?.data.message,
    isPending,
  };
};
