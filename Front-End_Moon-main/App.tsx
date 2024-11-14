import * as eva from '@eva-design/eva';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as Notifications from 'expo-notifications';
import * as React from 'react';
import {useEffect} from 'react';

import Routes from './src/routes';
import {socket} from './src/services/consts';

const queryClient = new QueryClient();
// "CFBundleURLSchemes": [
//     "com.googleusercontent.apps.311731786971-8u57guhlrft7cg0qaqder4dkk0ulk0gt"
// ]
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // Second, call the method

  socket.on('message', async data => {
    await Notifications.scheduleNotificationAsync({
      content: {
        data,
        title: `Message from ${data.name}`,
        body: `${data.text}`,
      },
      trigger: null,
    });
    await queryClient.invalidateQueries({queryKey: [`chatList`]});
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <Routes />
        </ApplicationProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
