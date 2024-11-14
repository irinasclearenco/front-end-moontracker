import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {TabContent} from '../consts';

const Dashboard = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const Component = TabContent[selectedIndex].component;
  return (
    <>
      <Component navigation={navigation} />
      <BottomNavigation
        style={styles.bottomNavigation}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {TabContent.map((tab, index) => (
          <BottomNavigationTab
            key={index}
            icon={selectedIndex === index ? tab.activeTabIcon : tab.icon}
          />
        ))}
      </BottomNavigation>
    </>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  bottomNavigation: {
    paddingTop: 25,
    paddingBottom: 25,
  },
});
