import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';

import {useGetChatList} from './api/useGetChatList';
import {socket} from '../services/consts';
import {User} from '../services/interfaces';

export const useJoinRooms = () => {
  const queryClient = useQueryClient();
  const currentUser: User = queryClient.getQueryData(['profile']);
  const {data} = useGetChatList();

  useEffect(() => {
    data?.forEach(({id}) => {
      const roomId = `${Math.min(currentUser?.id, id)}_${Math.max(currentUser?.id, id)}`;
      console.log('Joining room:', roomId);
      socket.emit('joinChat', roomId);
    });
  }, [data, currentUser?.id]);
  return data;
};
