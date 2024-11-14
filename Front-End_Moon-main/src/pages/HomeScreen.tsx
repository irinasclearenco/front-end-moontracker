import {Icon, IconElement, Layout, Text} from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import {FC, useEffect, useRef} from 'react';
import * as React from 'react';
import {StyleSheet, ImageProps} from 'react-native';

import {routeNames} from '../constants/routeNames';
import {useGetProfile} from '../hooks/api/useGetProfile';

const HomeScreen: FC = ({navigation}: any) => {
  const {data, isPending} = useGetProfile();
  const zoomIconRef = useRef<Icon<Partial<ImageProps>>>();

  const MoonIcon = (props): IconElement => (
    <Icon
      {...props}
      fill="black"
      name="moon"
      animation="zoom"
      ref={zoomIconRef}
      style={styles.icon}
    />
  );
  const checkIsAuth = async () => {
    const accessToken = await SecureStore.getItemAsync('access_token');
    const accessCode = await SecureStore.getItemAsync('access_code');
    if (!isPending) {
      if (accessCode) {
        navigation.navigate(routeNames.PARTNER, {accessCode});
      } else if (accessToken) {
        if (data?.role === 'DOCTOR') {
          navigation.navigate(routeNames.CABINET);
        } else {
          navigation.navigate(routeNames.DETAILS);
        }
      } else {
        navigation.navigate(routeNames.AUTHENTICATION);
      }
    }
  };

  useEffect(() => {
    if (zoomIconRef.current) {
      zoomIconRef.current.startAnimation();
    }
    checkIsAuth();
  }, [checkIsAuth]);

  return (
    <Layout style={styles.container}>
      <MoonIcon />
      <Text category="h1" style={styles.text}>
        Moon Tracker
      </Text>
    </Layout>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    gap: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  text: {
    color: 'black',
  },
});
