import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getPosts} from '../../services/api';

export const useGetPosts = () => {
  const {data, error, isLoading, isFetching} = useQuery<any, AxiosError<{message: string}>, any>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isFetching,
  };
};
