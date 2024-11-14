import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import {getAllUsers, getMessages} from '../../services/api';

export const useGetMessages = (userId, currentUserId) => {
  const {data, error, isLoading, isPending} = useQuery<any, AxiosError<{message: string}>, any>({
    queryKey: [`messages-${userId}`],
    queryFn: () => getMessages(userId),
    select: data =>
      data?.data?.map(el => {
        const {id, message, timestamp, receiver, sender} = el;
        const user = [sender, receiver].find(el => el.id === userId || el.id === currentUserId);
        // if (!user) return;
        return {
          _id: id,
          text: message,
          createdAt: timestamp,
          user: {_id: user.id, name: user.name},
        };
      }),
  });

  return {
    data,
    error: error?.response?.data?.message,
    isLoading,
    isPending,
  };
};
