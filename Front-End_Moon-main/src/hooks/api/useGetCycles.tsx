import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getCycles} from '../../services/api';

export const useGetCycles = () => {
  const {data, error, isLoading, isFetching} = useQuery<any, AxiosError<{message: string}>, any>({
    queryKey: ['cycles'],
    queryFn: getCycles,
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isFetching,
  };
};
