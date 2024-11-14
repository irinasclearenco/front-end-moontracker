import {useQueryClient} from '@tanstack/react-query';
import {
  Button,
  Datepicker,
  Divider,
  Input,
  Layout,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import moment from 'moment';
import {ReactElement, useState} from 'react';
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {CycleData} from './consts';
import {BackIcon, CalendarIcon} from '../../assets/Icons';
import AnimatedFlatList from '../../components/AnimatedFlatList';
import ErrorMessage from '../../components/ErrorMessage';
import {useUpdateProfile} from '../../hooks/api/useUpdateProfile';
import {User} from '../../services/interfaces';

const EditUserData = ({navigation}) => {
  const queryClient = useQueryClient();
  const userData: User = queryClient.getQueryData(['profile']);
  const {mutateAsync, error, isPending} = useUpdateProfile();
  const [showAnimatedFlatList, setShowAnimatedFlatList] = useState({
    cycleLength: false,
    periodLength: false,
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      cycleLength: userData?.cycleLength,
      periodLength: userData?.periodLength,
      birthday: userData?.birthday,
    },
  });

  const onUpdateButtonPress = data => {
    mutateAsync(data).then(() => {
      if (!isPending) navigation.goBack();
    });
  };
  return (
    <Layout style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          accessoryLeft={() => (
            <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
          )}
          title={() => <Text category="h6">Profile</Text>}
          style={styles.topNavigation}
          alignment="center"
        />
        <ScrollView style={styles.scrollView}>
          <ImageBackground
            style={styles.header}
            source={userData?.picture || require('../../assets/Avatars/moon.jpeg')}
          />
          <View style={{gap: 20}}>
            <View style={{gap: 20}}>
              <Controller
                name="name"
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    size="large"
                    placeholder="User name"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    size="large"
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    disabled
                  />
                )}
              />
            </View>
            <Controller
              name="birthday"
              control={control}
              render={({field: {onChange, value}}) => (
                <Datepicker
                  status="basic"
                  accessoryRight={CalendarIcon}
                  date={value ? moment(value).toDate() : new Date()}
                  onSelect={onChange}
                  size="large"
                />
              )}
            />
            {CycleData?.map(({items, title, key}) => (
              <Controller
                key={key}
                name={key as any}
                control={control}
                render={({field: {onChange, value}}) => (
                  <View>
                    <Layout>
                      <Pressable
                        style={styles.viewItem}
                        onPress={() =>
                          setShowAnimatedFlatList({
                            ...showAnimatedFlatList,
                            [key]: !showAnimatedFlatList[key],
                          })
                        }>
                        <Text category="s1">{title}</Text>
                        <Text category="s1">{value}</Text>
                      </Pressable>
                    </Layout>
                    <Divider />
                    {showAnimatedFlatList[key] && (
                      <AnimatedFlatList itemHeight={50} items={items} setLength={onChange} />
                    )}
                  </View>
                )}
              />
            ))}
          </View>
          <View style={styles.viewContainer}>
            <Button
              onPress={handleSubmit(onUpdateButtonPress)}
              style={styles.button}
              size="large"
              appearance="outline">
              Update
            </Button>
            {isPending && <Spinner status="danger" />}
            {error ? <ErrorMessage message={error} /> : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
export default EditUserData;

const styles = StyleSheet.create({
  viewItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 15,
    borderRadius: 10,
  },
  scrollView: {
    gap: 20,
    padding: 15,
  },

  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    gap: 30,
  },
  viewContainer: {
    alignItems: 'center',
    height: 100,
    paddingTop: 35,
    gap: 20,
  },
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 30,
  },
  topNavigation: {
    paddingRight: 10,
    paddingBottom: 20,
  },
});
