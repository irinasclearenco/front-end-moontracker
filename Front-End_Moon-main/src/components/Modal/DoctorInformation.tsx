import {
  Avatar,
  Button,
  Card,
  Divider,
  Layout,
  Modal,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {CloseIcon} from '../../assets/Icons';
import {routeNames} from '../../constants/routeNames';
import {useGetPostsByUserId} from '../../hooks/api/useGePostsByUserId';
import {useGetUserById} from '../../hooks/api/useGetUserById';
import Post from '../Post';
const DoctorInformation = ({visible, setVisible, userDataId, navigation, currentUser}) => {
  const {data: userData} = useGetUserById(userDataId);
  const {data} = useGetPostsByUserId(userDataId);
  const renderCloseAction = () => (
    <TopNavigationAction icon={CloseIcon} onPress={() => setVisible(false)} />
  );
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
      style={styles.modal}>
      <Layout style={styles.flex}>
        <TopNavigation
          alignment="center"
          accessoryLeft={renderCloseAction}
          title="Doctor Information"
          style={{marginTop: 40}}
        />
        <SafeAreaView style={styles.flex}>
          <ScrollView>
            <View>
              <View style={styles.scroll}>
                <Card style={styles.card}>
                  <View style={styles.view}>
                    <Avatar
                      source={userData?.picture || require('../../assets/Avatars/doctor.jpeg')}
                      size="giant"
                    />
                    <Text>{userData?.name || userData?.email}</Text>
                  </View>
                  <Divider />
                  <View style={styles.viewCard}>
                    <Text>{userData?.about}</Text>
                    <Button
                      appearance="outline"
                      onPress={() => {
                        navigation.navigate(routeNames.CHAT, {
                          id: userDataId,
                          userData: currentUser,
                        });
                        setVisible(false);
                      }}>
                      Ask me a question
                    </Button>
                  </View>
                </Card>
              </View>
              <View style={styles.viewPost}>
                {data?.map((post, index) => (
                  <Post post={post} key={index} setVisible={setVisible} setSelectedUser={false} />
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </Modal>
  );
};
export default DoctorInformation;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  flex: {
    flex: 1,
  },
  modal: {
    width: 400,
    height: 850,
  },
  card: {
    margin: 2,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  scroll: {
    display: 'flex',
    gap: 60,
    padding: 10,
  },
  viewCard: {
    gap: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  viewPost: {
    flex: 1,
    display: 'flex',
    padding: 20,
    gap: 30,
  },
});
