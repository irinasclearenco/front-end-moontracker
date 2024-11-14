import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getAllDoctors} from '../../services/api';

export const useGetAllDoctors = () => {
  const {data, error, isLoading, isPending, isSuccess} = useQuery<
    any,
    AxiosError<{message: string}>,
    any
  >({
    queryKey: ['doctors'],
    queryFn: getAllDoctors,
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isPending,
  };
};
