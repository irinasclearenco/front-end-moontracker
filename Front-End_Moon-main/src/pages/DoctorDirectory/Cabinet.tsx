import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {TabDoctorContent} from './consts';
import {useGetAllCycles} from '../../hooks/api/useGetAllCycles';
import {useGetAllUsers} from '../../hooks/api/useGetAllUsers';
import {useJoinRooms} from '../../hooks/useJoinRooms';

const Cabinet = ({navigation}) => {
  const {data} = useGetAllUsers();
  const {data: cycles} = useGetAllCycles();
  useJoinRooms();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const Component = TabDoctorContent[selectedIndex].component;

  return (
    <>
      <Component navigation={navigation} users={data} cycles={cycles} />
      <BottomNavigation
        style={styles.bottomNavigation}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {TabDoctorContent.map((tab, index) => (
          <BottomNavigationTab
            key={index}
            icon={selectedIndex === index ? tab.activeTabIcon : tab.icon}
          />
        ))}
      </BottomNavigation>
    </>
  );
};
export default Cabinet;

const styles = StyleSheet.create({
  bottomNavigation: {
    paddingTop: 25,
    paddingBottom: 25,
  },
});
