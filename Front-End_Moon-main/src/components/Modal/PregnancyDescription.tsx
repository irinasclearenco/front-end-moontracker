import {Layout, Modal, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, ImageBackground} from 'react-native';

import {CloseIcon} from '../../assets/Icons';

const PregnancyDescription = ({visible, setVisible, data}) => {
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
          title={moment(data?.date).format('MMMM Do')}
          subtitle={`${Math.ceil(data?.cycleDay / 7)} weeks`}
          style={{marginTop: 40}}
        />
        <SafeAreaView style={styles.flex}>
          <ScrollView>
            <View style={styles.card}>
              <ImageBackground
                style={{height: 200}}
                imageStyle={{borderRadius: 20}}
                source={{uri: data?.img}}
              />
              <Text>{data?.text}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </Modal>
  );
};
export default PregnancyDescription;

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
    padding: 20,
    margin: 0,
    display: 'flex',
    flex: 1,
    gap: 20,
  },
});
