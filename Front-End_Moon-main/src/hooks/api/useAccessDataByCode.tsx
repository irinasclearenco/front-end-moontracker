import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getUserDataByAccessCode} from '../../services/api';

export const useAccessDataByCode = accessCode => {
  const {data, error, isLoading, isFetching, refetch} = useQuery<
    any,
    AxiosError<{message: string}>,
    any
  >({
    queryKey: [`cycle-${accessCode}`],
    queryFn: () => getUserDataByAccessCode(accessCode),
    enabled: false,
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isFetching,
    refetch,
  };
};
