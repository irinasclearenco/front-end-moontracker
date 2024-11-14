import {useQueryClient} from '@tanstack/react-query';
import {
  Divider,
  Icon,
  IconElement,
  Layout,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {BackIcon, PeopleIcon, PlusSquareIcon} from '../../assets/Icons';
import {routeNames} from '../../constants/routeNames';
import {useGetChatList} from '../../hooks/api/useGetChatList';
import {User} from '../../services/interfaces';

interface IListItem {
  id: number;
  name: string;
  lastMessage: string;
  receiverId: number;
  senderId: number;
}

const ChatList = ({navigation, users, cycles}: any): React.ReactElement => {
  const {data} = useGetChatList();
  const queryClient = useQueryClient();
  const userData: User = queryClient.getQueryData(['profile']);

  const renderSettingsAction = (): React.ReactElement =>
    userData?.role === 'DOCTOR' ? (
      <TopNavigationAction
        icon={PlusSquareIcon}
        onPress={() => navigation.navigate(routeNames.CREATEPOSTS)}
      />
    ) : (
      <TopNavigationAction
        icon={PeopleIcon}
        onPress={() => navigation.navigate(routeNames.DOCTORSLIST)}
      />
    );
  const renderBackAction = () => {
    return (
      userData?.role === 'USER' && (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
      )
    );
  };
  const renderItemAccessory = (item): React.ReactElement => (
    <View style={styles.unReadContainer}>
      <Text category="p2">{moment(item.timestamp).fromNow()}</Text>
      {!item.isRead && <View style={styles.unRead} />}
    </View>
  );

  const renderItemIcon = (props): IconElement => <Icon {...props} name="person" />;

  const renderItem = ({item, index}: {item: IListItem; index: number}): React.ReactElement => (
    <ListItem
      onPress={() => {
        navigation.navigate(routeNames.CHAT, {
          id: item?.id,
          userData,
        });
      }}
      title={item.name}
      description={item.lastMessage}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderItemAccessory(item)}
      key={index}
    />
  );

  return (
    <Layout style={styles.layout}>
      <TopNavigation
        title="Conversations"
        accessoryRight={renderSettingsAction}
        accessoryLeft={renderBackAction}
        alignment="center"
      />
      <Divider />
      {data?.length ? (
        <List style={styles.container} data={data} renderItem={renderItem} />
      ) : (
        <View style={styles.view}>
          <Text>no messages yet</Text>
        </View>
      )}
    </Layout>
  );
};
export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    paddingTop: 40,
  },
  view: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unRead: {
    backgroundColor: 'pink',
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  unReadContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
