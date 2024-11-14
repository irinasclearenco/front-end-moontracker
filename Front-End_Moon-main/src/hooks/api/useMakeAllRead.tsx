import {useMutation} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {makeAllRead} from '../../services/api';

export const useMakeAllRead = () => {
  const {mutateAsync, error, isPending} = useMutation<
    AxiosResponse<any>,
    AxiosError<{message: string}>,
    any,
    unknown
  >({
    mutationFn: userId => makeAllRead(userId),
  });
  return {
    mutateAsync,
    error: error?.response?.data.message,
    isPending,
  };
};
