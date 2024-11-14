import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getCyclesByUserId} from '../../services/api';

export const useGetCyclesByUserId = (id: string) => {
  const {data, error, isLoading, isFetching} = useQuery<any, AxiosError<{message: string}>, any>({
    queryKey: [`cycles-${id}`],
    queryFn: () => getCyclesByUserId(id),
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isFetching,
  };
};
