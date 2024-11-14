import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getAllCycles} from '../../services/api';

export const useGetAllCycles = () => {
  const {data, error, isLoading, isFetching} = useQuery<any, AxiosError<{message: string}>, any>({
    queryKey: ['all-cycles'],
    queryFn: getAllCycles,
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isFetching,
  };
};
