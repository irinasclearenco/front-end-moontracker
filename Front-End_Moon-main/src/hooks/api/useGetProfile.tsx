import {useQuery} from '@tanstack/react-query';
import {getProfile} from '../../services/api';
import {AxiosError} from 'axios';

export const useGetProfile = () => {
  const {data, error, isLoading, isPending} = useQuery<any, AxiosError<{message: string}>, any>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return {
    data: data,
    error: error?.response?.data?.message,
    isLoading,
    isPending
  };
};
