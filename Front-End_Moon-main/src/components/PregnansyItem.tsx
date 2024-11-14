import {Button, Text} from '@ui-kitten/components';
import moment from 'moment/moment';
import React, {useCallback, useState} from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity, View} from 'react-native';

import PregnancyDescription from './Modal/PregnancyDescription';
import {AllSymptoms} from './Modal/consts';
import {PlusIcon} from '../assets/Icons';

const PregnansyItem = ({reservation, currentDay, handleAddSymptoms, cycles, handlePeriodMark}) => {
  const isCurrentDay = reservation.day === currentDay;
  const isBefore = moment(reservation?.day).isBefore(moment());
  const color = isBefore ? 'white' : 'black';
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

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
  const onPressDay = () => {
    setData(cycles[reservation?.day]);
    setVisible(true);
  };

  return (
    <TouchableOpacity onPress={() => onPressDay()}>
      <PregnancyDescription visible={visible} setVisible={setVisible} data={data} />
      <ImageBackground
        source={{uri: cycles?.[reservation?.day]?.img}}
        resizeMode="cover"
        style={[
          {
            ...styles.image,
          },
          {
            justifyContent: isCurrentDay ? 'space-between' : 'flex-end',
            height: isCurrentDay ? 200 : reservation.height,
            backgroundColor: isBefore ? 'lightgray' : 'white',
            borderColor: 'white',
          },
        ]}
        imageStyle={{borderRadius: 50}}>
        {isBefore && (
          <Button
            style={styles.button}
            onPress={() => handlePeriodMark(reservation.day)}
            appearance="ghost"
            size={isCurrentDay ? 'giant' : 'medium'}
            status="control">
            Mark the day of pregnancy
          </Button>
        )}

        {isBefore && handleSymptoms()}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default React.memo(PregnansyItem);
const styles = StyleSheet.create({
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
  image: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    borderWidth: 2,
    borderColor: 'white',
  },
});
