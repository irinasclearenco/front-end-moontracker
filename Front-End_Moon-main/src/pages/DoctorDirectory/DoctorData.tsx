import {useQueryClient} from '@tanstack/react-query';
import {
  Avatar,
  Card,
  Layout,
  Button,
  Text,
  Spinner,
  Input,
  Datepicker,
  Divider,
} from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment/moment';
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {CalendarIcon, LogOutIcon} from '../../assets/Icons';
import ErrorMessage from '../../components/ErrorMessage';
import Post from '../../components/Post';
import {routeNames} from '../../constants/routeNames';
import {useGetPostsByUserId} from '../../hooks/api/useGePostsByUserId';
import {useUpdateProfile} from '../../hooks/api/useUpdateProfile';
import {User} from '../../services/interfaces';

const DoctorData = ({navigation, users, cycles}) => {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(['profile']);
  const {data: posts} = useGetPostsByUserId(data?.id);
  const {mutateAsync, error, isPending} = useUpdateProfile();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: data?.name,
      email: data?.email,
      about: data?.about,
      birthday: data?.birthday,
    },
  });
  const onUpdateButtonPress = async data => {
    await mutateAsync(data);
  };
  const footer = () => {
    return (
      <Button appearance="ghost" onPress={handleSubmit(onUpdateButtonPress)}>
        Update profile
      </Button>
    );
  };
  const logOut = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    await queryClient.invalidateQueries({refetchType: 'none'});
    navigation.navigate(routeNames.AUTHENTICATION);
  };

  return (
    <Layout style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.scroll}>
            <Card style={styles.card} footer={footer}>
              <View style={styles.view}>
                <Avatar
                  source={data?.picture || require('../../assets/Avatars/doctor.jpeg')}
                  size="giant"
                />
                <Text>{data?.name || data?.email}</Text>
              </View>
              <Divider />
              <View style={styles.viewCard}>
                <Controller
                  name="name"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input placeholder="User name" value={value} onChangeText={onChange} />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input placeholder="Email" value={value} onChangeText={onChange} disabled />
                  )}
                />
                <Controller
                  name="birthday"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Datepicker
                      status="basic"
                      min={new Date('1960-01-01')}
                      max={new Date()}
                      accessoryRight={CalendarIcon}
                      date={value ? moment(value).toDate() : new Date()}
                      onSelect={onChange}
                    />
                  )}
                />
                <Controller
                  name="about"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="About me"
                      multiline
                      value={value}
                      onChangeText={onChange}
                      style={{minHeight: 64}}
                    />
                  )}
                />
              </View>
            </Card>
            <View style={styles.viewContainer}>
              {isPending && <Spinner status="danger" />}
              {error ? <ErrorMessage message={error} /> : null}
            </View>
            <View style={styles.viewPost}>
              {posts?.map((post, index) => (
                <Post post={post} key={index} setVisible={null} setSelectedUser={false} />
              ))}
            </View>
            <Button status="basic" appearance="ghost" accessoryLeft={LogOutIcon} onPress={logOut}>
              Log out
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
export default DoctorData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    display: 'flex',
    gap: 10,
    padding: 10,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  viewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewCard: {
    gap: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  card: {
    margin: 2,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  viewPost: {
    flex: 1,
    display: 'flex',
    padding: 10,
    gap: 30,
  },
});
