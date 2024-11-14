import {useFocusEffect} from '@react-navigation/core';
import {useQueryClient} from '@tanstack/react-query';
import {
  Avatar,
  Card,
  Layout,
  Button,
  Text,
  Select,
  SelectItem,
  IndexPath,
  Drawer,
  Divider,
  DrawerItem,
  Spinner,
  Input,
} from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {BrushIcon, FileTextIcon, ForwardIcon, LogOutIcon} from '../../assets/Icons';
import ErrorMessage from '../../components/ErrorMessage';
import {routeNames} from '../../constants/routeNames';
import {useGenerateAccessCode} from '../../hooks/api/useGenerateAccessCode';
import {useUpdateProfile} from '../../hooks/api/useUpdateProfile';
import {User} from '../../services/interfaces';
import {WayToUseAppData} from '../UserData/consts';

const Header = (): React.ReactElement => (
  <>
    <Divider />
  </>
);

const Settings = ({navigation}) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<User>();
  const {mutateAsync, error, isPending} = useUpdateProfile();
  const {mutateAsync: generateCode} = useGenerateAccessCode();

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [selectedDrawerItemIndex, setSelectedDrawerItemIndex] = useState(new IndexPath(0));

  useFocusEffect(() => {
    setData(queryClient.getQueryData(['profile']));
  });
  const footer = () => {
    return (
      <Button appearance="ghost" onPress={() => navigation.navigate(routeNames.EDITUSERDATA)}>
        Edit Profile
      </Button>
    );
  };
  useEffect(() => {
    const index = WayToUseAppData.findIndex(({value}) => value === data?.goal);
    setSelectedIndex(new IndexPath(index));
  }, [data?.goal]);
  const logOut = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    await queryClient.invalidateQueries({refetchType: 'none'});
    navigation.navigate(routeNames.AUTHENTICATION);
  };
  const onChangeWayToUseApp = index => {
    setSelectedIndex(index);
    mutateAsync({goal: WayToUseAppData[index.row].value});
  };
  const onPressGenerate = async () => {
    await generateCode(data.id);
  };
  return (
    <Layout style={styles.container}>
      <Card style={styles.card} footer={footer}>
        <View style={styles.view}>
          <Avatar
            source={data?.picture || require('../../assets/Avatars/moon.jpeg')}
            size="giant"
          />
          <Text>{data?.name || data?.email}</Text>
        </View>
      </Card>
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index: IndexPath) => onChangeWayToUseApp(index)}
        value={WayToUseAppData[selectedIndex.row]?.title}
        placeholder="Your way to use the app">
        {WayToUseAppData.map(({title}) => {
          return <SelectItem title={title} key={title} />;
        })}
      </Select>
      <View style={styles.viewContainer}>
        {isPending && <Spinner status="danger" />}
        {error ? <ErrorMessage message={error} /> : null}
      </View>
      <Divider />
      <View style={styles.generate}>
        {/*<Text>Link your partner</Text>*/}
        <Button appearance="outline" style={{borderRadius: 10}} onPress={onPressGenerate}>
          Link your partner
        </Button>
        <Input
          style={{borderRadius: 10}}
          placeholder="Generated access token"
          value={data?.accessCode}
        />
      </View>
      <Drawer
        header={Header}
        selectedIndex={selectedDrawerItemIndex}
        onSelect={index => setSelectedDrawerItemIndex(index)}>
        <DrawerItem title="Theme" accessoryLeft={BrushIcon} accessoryRight={ForwardIcon} />
        <DrawerItem
          title="Graphs and reports"
          accessoryLeft={FileTextIcon}
          accessoryRight={ForwardIcon}
          onPress={() => navigation.navigate(routeNames.CYCLELENGTH)}
        />
      </Drawer>
      <Button status="basic" appearance="ghost" accessoryLeft={LogOutIcon} onPress={logOut}>
        Log out
      </Button>
    </Layout>
  );
};
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
    flexDirection: 'column',
    gap: 40,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'stretch',
  },
  viewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 2,
    borderRadius: 20,
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },

  generate: {
    display: 'flex',
    gap: 10,
  },
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
