import {FC, useState} from 'react';
import {Avatar, Button, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {routeNames} from '../../constants/routeNames';
import {useUpdateProfile} from '../../hooks/api/useUpdateProfile';
import ErrorMessage from '../../components/ErrorMessage';
import {useQueryClient} from '@tanstack/react-query';

const AvatarAndName: FC = ({navigation}: any) => {
  const [value, setValue] = useState('');
  const {mutateAsync, error, isPending} = useUpdateProfile();
  const saveUserName = () => {
    mutateAsync({name: value}).then(() => {
      navigation.navigate(routeNames.BIRTHDAY);
    });
  };

  return (
    <Layout style={styles.container}>
      <Text category="h4" style={styles.text}>
        Choose your avatar and enter your nickname
      </Text>
      <View style={styles.view}>
        <Avatar source={require('../../assets/Avatars/moon.jpeg')} size="giant" />
        <Input
          status="danger"
          style={styles.input}
          placeholder="Enter your name"
          value={value}
          onChangeText={setValue}
        />
      </View>
      <View style={styles.viewContainer}>
        <Button style={styles.button} status="danger" onPress={() => saveUserName()}>
          Next
        </Button>
        {isPending && <Spinner status="danger" />}
        {error ? <ErrorMessage message={error} /> : null}
      </View>
    </Layout>
  );
};
export default AvatarAndName;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewContainer: {
    alignItems: 'center',
    height: 100,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'stretch',
  },
  text: {
    textAlign: 'center',
  },
  button: {
    width: 350,
    height: 50,
    alignSelf: 'stretch',
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    width: '80%',
  },
});
