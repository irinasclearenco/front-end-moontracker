import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getChatList} from '../../services/api';

export const useGetChatList = () => {
  const {data, error, isLoading, isPending} = useQuery<any, AxiosError<{message: string}>, any>({
    queryKey: ['chatList'],
    queryFn: getChatList,
  });

  return {
    data: data?.data,
    error: error?.response?.data?.message,
    isLoading,
    isPending,
  };
};
