import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getAllUsers} from '../../services/api';

export const useGetAllUsers = () => {
  const {data, error, isLoading, isPending, isSuccess} = useQuery<
    any,
    AxiosError<{message: string}>,
    any
  >({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isPending,
  };
};
