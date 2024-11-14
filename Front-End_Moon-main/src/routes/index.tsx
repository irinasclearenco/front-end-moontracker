import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import {FC} from 'react';

import {authRoutes, routes} from './consts';
import {Route} from './interfaces';
import {navigationRef} from '../services/NavigationService';

const Routes: FC = () => {
  const Stack = createNativeStackNavigator();
  const token = async () => await SecureStore.getItemAsync('access_token');

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {token
          ? authRoutes.map(({name, component}: Route) => (
              <Stack.Screen
                name={name}
                component={component}
                key={name}
                options={{headerShown: false}}
              />
            ))
          : routes.map(({name, component}: Route) => (
              <Stack.Screen
                name={name}
                component={component}
                key={name}
                options={{headerShown: false}}
              />
            ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
