import {Layout, Modal, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {AllSymptoms} from './consts';
import {CloseIcon} from '../../assets/Icons';
import {usePostSymptom} from '../../hooks/api/usePostSymptom';

const SymptomsModal = ({visible, setVisible, selectedDay, cycles}) => {
  const {mutateAsync, error, isPending} = usePostSymptom();
  if (!cycles) return null;

  const renderCloseAction = () => (
    <TopNavigationAction icon={CloseIcon} onPress={() => setVisible(false)} />
  );
  const onPressAddSymptom = (category: string, symptom: string) => () => {
    if (!cycles) return;
    if (category && symptom) {
      mutateAsync({
        id: cycles[selectedDay].id,
        category,
        symptom,
      });
    }
  };

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
          title={moment(selectedDay).format('MMMM Do')}
          subtitle={`Cycle day ${cycles[selectedDay]?.cycleDay}`}
          style={{marginTop: 40}}
        />
        <SafeAreaView style={styles.flex}>
          <ScrollView>
            <View style={styles.card}>
              {AllSymptoms.map(({categoryData, categoryName, color}, index) => (
                <View style={{...styles.section, backgroundColor: color}} key={index}>
                  <Text category="h6">How are you feeling today?</Text>
                  <View style={styles.view}>
                    {categoryData.map(({Svg, name}) => {
                      return (
                        <TouchableOpacity
                          onPress={onPressAddSymptom(categoryName, name)}
                          style={
                            cycles?.[selectedDay]?.symptoms?.find(el => el.symptom === name)
                              ? styles.viewItemActive
                              : styles.viewItem
                          }
                          key={name}>
                          <Svg height={50} width={50} fill="black" />
                          <Text category="s2">{name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Layout>
    </Modal>
  );
};
export default SymptomsModal;
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
  viewItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
  },
  viewItemActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    borderWidth: 1,
    borderColor: 'back',
    borderRadius: 20,
  },
  section: {
    gap: 20,
    padding: 20,
    borderRadius: 20,
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
