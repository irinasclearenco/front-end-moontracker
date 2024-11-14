import {useQueryClient} from '@tanstack/react-query';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {BackIcon} from '../../assets/Icons';
import {routeNames} from '../../constants/routeNames';
import {useGetAllDoctors} from '../../hooks/api/useGetAllDoctors';
import {User} from '../../services/interfaces';

const DoctorsList = ({navigation}) => {
  const queryClient = useQueryClient();
  const userData: User = queryClient.getQueryData(['profile']);
  const {data} = useGetAllDoctors();
  const renderCloseAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
  return (
    <Layout style={styles.flex}>
      <TopNavigation
        alignment="center"
        accessoryLeft={renderCloseAction}
        title="Doctors List"
        style={{marginTop: 40}}
      />
      <SafeAreaView style={styles.flex}>
        <ScrollView>
          <View style={styles.scroll}>
            {data?.map((item, index) => (
              <Card style={styles.card} key={index}>
                <View style={styles.view}>
                  <Avatar
                    source={item?.picture || require('../../assets/Avatars/doctor.jpeg')}
                    size="giant"
                  />
                  <Text>{item?.name || item?.email}</Text>
                </View>
                <Divider />
                <View style={styles.viewCard}>
                  <Text category="p1">{item.about}</Text>
                  <Button
                    appearance="outline"
                    onPress={() => navigation.navigate(routeNames.CHAT, {id: item?.id, userData})}>
                    Ask me a question
                  </Button>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
export default DoctorsList;

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
    gap: 20,
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
