import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getUserById} from '../../services/api';

export const useGetUserById = (id: string) => {
  const {data, error, isLoading, isFetching} = useQuery<any, AxiosError<{message: string}>, any>({
    queryKey: [`user-${id}`],
    queryFn: () => getUserById(id),
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isFetching,
  };
};
