import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getPostsByUserId} from '../../services/api';

export const useGetPostsByUserId = id => {
  const {data, error, isLoading, isFetching} = useQuery<any, AxiosError<{message: string}>, any>({
    queryKey: [`posts-${id}`],
    queryFn: () => getPostsByUserId(id),
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isFetching,
  };
};
