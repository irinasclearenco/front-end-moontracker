import {FC} from 'react';
import {Button, Layout, Spinner, Text} from '@ui-kitten/components';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {routeNames} from '../../constants/routeNames';
import {useUpdateProfile} from '../../hooks/api/useUpdateProfile';
import {WayToUseAppData} from './consts';
import ErrorMessage from '../../components/ErrorMessage';

const WayToUseApp: FC = ({navigation}: any) => {
  const {mutateAsync, error, isPending} = useUpdateProfile();

  const onWayToUseAppPress = value => {
    mutateAsync({goal: value}).then(() => {
      navigation.navigate(routeNames.AVATARANDNAME);
    });
  };

  return (
    <Layout style={styles.container}>
      <Text category="h3" style={styles.text}>
        What is your way to use the application?
      </Text>
      <View style={styles.view}>
        {WayToUseAppData.map(({title, value}) => (
          <Button
            key={value}
            style={styles.button}
            appearance="filled"
            status="danger"
            onPress={() => onWayToUseAppPress(value)}>
            {title}
          </Button>
        ))}
      </View>
      <View style={styles.viewContainer}>
        {isPending && <Spinner status="danger" />}
        {error ? <ErrorMessage message={error} /> : null}
      </View>
    </Layout>
  );
};

export default WayToUseApp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  viewContainer: {
    alignItems: 'center',
    height: 100,
  },
  view: {
    padding: 10,
    alignItems: 'center',
    gap: 20,
  },
  text: {
    textAlign: 'center',
  },
  button: {
    width: 350,
    height: 80,
    borderRadius: 20,
  },
});
