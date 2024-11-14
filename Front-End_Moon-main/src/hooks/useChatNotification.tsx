import {useQueryClient} from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import {useEffect} from 'react';

import {useMakeAllRead} from './api/useMakeAllRead';

export const useChatNotification = id => {
  const queryClient = useQueryClient();
  const {mutateAsync} = useMakeAllRead();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async (notification: any) => {
        await mutateAsync(id);
        await queryClient.invalidateQueries({queryKey: [`messages-${id}`]});

        return {
          shouldShowAlert: notification.request.content.data.receiverId === id,
          shouldPlaySound: false,
          shouldSetBadge: false,
        };
      },
    });

    mutateAsync(id).then(() => {
      queryClient.invalidateQueries({queryKey: [`chatList`]});
    });

    return () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });
    };
  }, [id]);
};
