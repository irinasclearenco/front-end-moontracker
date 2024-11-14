import {Button, Text} from '@ui-kitten/components';
import moment from 'moment/moment';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {AllSymptoms} from './Modal/consts';
import {PlusIcon} from '../assets/Icons';

const ItemComponent = ({reservation, cycles, currentDay, handleAddSymptoms, handlePeriodMark}) => {
  const isCurrentDay = reservation.day === currentDay;
  const isBefore = moment(reservation?.day).isBefore(moment());
  const color = isBefore ? 'white' : 'black';

  const handleSymptoms = useCallback(() => {
    if (cycles?.[reservation?.day]?.symptoms.length > 0) {
      return (
        <View style={styles.view}>
          {cycles?.[reservation?.day]?.symptoms?.map(({symptom, category}) =>
            AllSymptoms.map(({categoryName, categoryData}) => {
              if (categoryName === category) {
                return categoryData.map(({Svg, name}) => {
                  if (symptom === name) {
                    return <Svg height={25} width={25} fill={color} key={name} />;
                  }
                });
              }
            }),
          )}
          <TouchableOpacity onPress={() => handleAddSymptoms(reservation.day)}>
            {PlusIcon({height: 20, width: 20, fill: 'white'})}
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={() => handleAddSymptoms(reservation.day)}>
          {PlusIcon({height: 20, width: 20, fill: 'white'})}
          <Text style={{fontSize: 12, color}}> Add symptoms</Text>
        </TouchableOpacity>
      );
    }
  }, [handleAddSymptoms, cycles, reservation.day, color]);

  return (
    <TouchableOpacity
      key={reservation.day}
      style={[
        {
          ...styles.item,
          backgroundColor: isBefore ? cycles?.[reservation?.day]?.color || 'lightgray' : 'white',
          borderColor: cycles?.[reservation.day]?.color || 'white',
        },
        {height: isCurrentDay ? 200 : reservation.height},
      ]}>
      <Button
        style={styles.button}
        onPress={() => handlePeriodMark(reservation.day)}
        appearance="ghost"
        size={isCurrentDay ? 'giant' : 'medium'}
        status={isBefore ? 'control' : 'basic'}>
        Mark your period
      </Button>
      {isBefore && handleSymptoms()}
    </TouchableOpacity>
  );
};

export default React.memo(ItemComponent);
const styles = StyleSheet.create({
  item: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderWidth: 2,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
