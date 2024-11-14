import {Layout, ProgressBar, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {BackIcon} from '../../assets/Icons';
import * as React from 'react';

const CycleLength = ({navigation}) => {
  return (
    <Layout style={styles.containerSafeView}>
      <SafeAreaView style={styles.containerSafeView}>
        <TopNavigation
          accessoryLeft={() => (
            <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
          )}
          title={() => <Text category="h5">Cycle length</Text>}
          style={styles.topNavigation}
          alignment="center"
        />
        <Layout style={styles.layout}>
          <Text category="s1">Your average cycle length is 28</Text>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.viewItem}>
                <View style={styles.progressBar}>
                  <Text category="p2">24 dec. 2023 - 22 jan. 2023</Text>
                  <ProgressBar progress={0.9} size="giant" />
                </View>
                <Text category="s2">28 days</Text>
              </View>
              <View style={styles.viewItem}>
                <View style={styles.progressBar}>
                  <Text category="p2">24 dec. 2023 - 22 jan. 2023</Text>
                  <ProgressBar progress={0.7} size="giant" />
                </View>
                <Text category="s2">28 days</Text>
              </View>
              <View style={styles.viewItem}>
                <View style={styles.progressBar}>
                  <Text category="p2">24 dec. 2023 - 22 jan. 2023</Text>
                  <ProgressBar progress={0.8} size="giant" />
                </View>
                <Text category="s2">28 days</Text>
              </View>
              <View style={styles.viewItem}>
                <View style={styles.progressBar}>
                  <Text category="p2">24 dec. 2023 - 22 jan. 2023</Text>
                  <ProgressBar progress={0.9} size="giant" />
                </View>
                <Text category="s2">28 days</Text>
              </View>
              <View style={styles.viewItem}>
                <View style={styles.progressBar}>
                  <Text category="p2">24 dec. 2023 - 22 jan. 2023</Text>
                  <ProgressBar progress={0.7} size="giant" />
                </View>
                <Text category="s2">28 days</Text>
              </View>
            </View>
          </ScrollView>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};
export default CycleLength;
const styles = StyleSheet.create({
  containerSafeView: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 50,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },
  view: {
    display: 'flex',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  viewItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    marginBottom: 10,
  },
  topNavigation: {
    paddingRight: 10,
    paddingBottom: 20,
  },
});
