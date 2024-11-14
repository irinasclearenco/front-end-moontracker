import {Button, Input, Layout, Spinner} from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';

import ErrorMessage from '../../../components/ErrorMessage';
import {routeNames} from '../../../constants/routeNames';
import {useAccessDataByCode} from '../../../hooks/api/useAccessDataByCode';

const Guest: FC = ({navigation, selectedIndex}: any) => {
  const [value, setValue] = useState('');
  const {data, error, isLoading, refetch} = useAccessDataByCode(value);
  const onPressEnter = async () => {
    refetch().then(async e => {
      if (e.status !== 'success') return;
      await SecureStore.setItemAsync('access_code', value);
      navigation.navigate(routeNames.PARTNER, {accessCode: value});
      setValue('');
    });
  };
  return (
    <Layout style={styles.container}>
      <Input
        value={value}
        placeholder="Enter your access code"
        onChangeText={nextValue => setValue(nextValue)}
      />
      <Button onPress={onPressEnter} style={styles.button}>
        Enter
      </Button>
      {isLoading && <Spinner status="danger" />}
      {error ? <ErrorMessage message={error} /> : null}
    </Layout>
  );
};
export default Guest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    gap: 20,
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },
});
