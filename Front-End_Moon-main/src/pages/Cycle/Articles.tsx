import {useQueryClient} from '@tanstack/react-query';
import {Layout, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {ChatIcon} from '../../assets/Icons';
import DoctorInformation from '../../components/Modal/DoctorInformation';
import Post from '../../components/Post';
import {routeNames} from '../../constants/routeNames';
import {useGetPosts} from '../../hooks/api/useGetPosts';
import {useJoinRooms} from '../../hooks/useJoinRooms';
import {User} from '../../services/interfaces';

const Articles = ({navigation}) => {
  const queryClient = useQueryClient();
  const userData: User = queryClient.getQueryData(['profile']);
  const rooms = useJoinRooms();
  const {data} = useGetPosts();
  const [selectedUser, setSelectedUser] = useState(null);
  const [visible, setVisible] = useState({});

  const renderRightAction = useCallback(
    () => (
      <View>
        {rooms?.find(el => !el.isRead) ? <View style={styles.unRead} /> : null}
        <TopNavigationAction
          icon={ChatIcon}
          onPress={() => navigation.navigate(routeNames.CHATLIST)}
        />
      </View>
    ),
    [rooms],
  );
  return (
    <Layout style={styles.containerSafeView}>
      {visible && selectedUser && (
        <DoctorInformation
          setVisible={setVisible}
          visible={visible}
          currentUser={userData}
          userDataId={selectedUser}
          navigation={navigation}
        />
      )}
      <SafeAreaView style={styles.containerSafeView}>
        <TopNavigation alignment="center" accessoryRight={renderRightAction} title="Articles" />
        <ScrollView>
          <View style={styles.viewPost}>
            {data?.map((post, index) => (
              <Post
                post={post}
                key={index}
                setVisible={setVisible}
                setSelectedUser={setSelectedUser}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
export default Articles;

const styles = StyleSheet.create({
  containerSafeView: {
    flex: 1,
  },
  viewPost: {
    flex: 1,
    display: 'flex',
    padding: 20,
    gap: 30,
  },
  unRead: {
    backgroundColor: 'pink',
    width: 10,
    height: 10,
    borderRadius: 50,
    position: 'absolute',
    right: 8,
    zIndex: 1,
  },
});
