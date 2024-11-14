import {ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID} from '@env';
import {Layout, Tab, TabView, Text} from '@ui-kitten/components';
import {makeRedirectUri} from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, {FC, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {routeNames} from '../../constants/routeNames';
import {Tabs} from '../../constants/tabs';
import {useContinueWithGoogle} from '../../hooks/api/useContinueWithGoogle';
import {getUserInfo} from '../../utils';

WebBrowser.maybeCompleteAuthSession();
const config = {
  expoClientId: EXPO_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
};
const Authentication: FC = ({navigation}: any) => {
  const uri = makeRedirectUri();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const {mutateAsync, error, isPending} = useContinueWithGoogle();
  const [request, response, promptAsync] = Google.useAuthRequest({...config});

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    if (response && response.type === 'success') {
      const googleData = await getUserInfo(response.authentication.accessToken);
      mutateAsync(googleData).then(() => {
        if (!isPending && !error) {
          navigation.navigate(routeNames.DETAILS);
        }
      });
    }
  };

  return (
    <>
      <Layout style={styles.secondContainer}>
        <Text category="h1">Welcome</Text>
      </Layout>
      <Layout style={styles.container}>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          style={{width: '100%'}}>
          {Tabs.map(({name, Component}) => (
            <Tab title={name} style={styles.tabContainer} key={name}>
              <Component
                navigation={navigation}
                promptAsync={promptAsync}
                googleError={error}
                googleIsPending={isPending}
                selectedIndex={selectedIndex}
              />
            </Tab>
          ))}
        </TabView>
      </Layout>
    </>
  );
};
export default Authentication;

const styles = StyleSheet.create({
  secondContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 2,
    alignItems: 'center',
    gap: 10,
  },
  tabContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
