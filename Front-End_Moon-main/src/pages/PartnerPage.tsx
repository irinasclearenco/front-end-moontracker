import {useQueryClient} from '@tanstack/react-query';
import {Button, Divider, Layout, ProgressBar, Text, TopNavigation} from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {LogOutIcon} from '../assets/Icons';
import {AllSymptoms} from '../components/Modal/consts';
import {routeNames} from '../constants/routeNames';
import {useAccessDataByCode} from '../hooks/api/useAccessDataByCode';

const currentDay = moment().format('YYYY-MM-DD').toString();
const PartnerPage = ({navigation, route}) => {
  const queryClient = useQueryClient();
  const {accessCode} = route?.params;
  const {data, isFetching, refetch} = useAccessDataByCode(accessCode);
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const marketDates = useMemo(() => {
    if (data && !isFetching) {
      return Object.keys(data).reduce((newMap, currentDate) => {
        const {color, symptoms} = data?.[currentDate];
        newMap[currentDate] = {selected: true, selectedColor: color, marked: !!symptoms?.length};
        return newMap;
      }, {});
    }
    return {};
  }, [data, isFetching, data?.id]);

  const sortedArray = useMemo(() => {
    if (!data || typeof data !== 'object') {
      return [];
    }
    return Object.keys(data)
      .filter(key => data[key]?.cycleDay === 1 && moment(key).isBefore(moment()))
      .sort((a, b) => moment(b).valueOf() - moment(a).valueOf());
  }, [data]);

  const sortedArrayPeriods = useMemo(() => {
    if (!data || typeof data !== 'object') {
      return [];
    }
    return Object.keys(data)
      .filter(
        key =>
          data[key]?.phase === 'Menstrual' &&
          data[key]?.endingDay &&
          moment(key).isBefore(moment()),
      )
      .sort((a, b) => moment(b).valueOf() - moment(a).valueOf());
  }, [data]);
  const getDays = (el, index) =>
    Math.round(moment.duration(moment(el).diff(moment(sortedArray[index + 1]))).asDays());

  const logOut = async () => {
    await SecureStore.deleteItemAsync('access_code');
    await queryClient.invalidateQueries({refetchType: 'none'});
    navigation.navigate(routeNames.AUTHENTICATION);
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <Layout style={styles.flex}>
      <TopNavigation
        alignment="center"
        title={data?.[currentDay]?.user?.name}
        subtitle={data?.[currentDay]?.user?.goal}
        style={{marginTop: 40}}
      />
      <SafeAreaView style={styles.flex}>
        <ScrollView>
          <View style={styles.card}>
            <ProgressBar
              progress={data?.[selectedDay]?.cycleDay / data?.[selectedDay].user?.cycleLength || 0}
              size="small"
            />
            <Calendar
              enableSwipeMonths
              current={currentDay}
              markedDates={marketDates}
              firstDay={1}
              onDayPress={date => setSelectedDay(date.dateString)}
            />
            <Divider />
            <Text category="s1" style={styles.center}>
              Cycle day {data?.[selectedDay]?.cycleDay || 0}
            </Text>
            <View style={styles.item}>
              {data?.[selectedDay]?.symptoms?.length ? (
                data?.[selectedDay]?.symptoms?.map(({symptom, category}) =>
                  AllSymptoms.map(({categoryName, categoryData}) => {
                    if (categoryName === category) {
                      return categoryData.map(({Svg, name}) => {
                        if (symptom === name) {
                          return (
                            <View style={styles.center} key={name}>
                              <Svg height={40} width={40} fill="black" key={name} />
                              <Text category="p2">{name}</Text>
                            </View>
                          );
                        }
                      });
                    }
                  }),
                )
              ) : (
                <Text category="p2">No symptoms noted</Text>
              )}
            </View>
            <Text category="p1">
              The average cycle lasts{' '}
              <Text category="s1">{data?.[currentDay]?.user?.cycleLength} days</Text>
            </Text>
            <ScrollView style={{flex: 1, maxHeight: 175}}>
              <View style={styles.container}>
                {sortedArray?.map((el, index) => (
                  <View style={styles.viewItem} key={el}>
                    <View style={styles.progressBar}>
                      <Text category="p2">
                        {moment(sortedArray[index + 1]).format('MMM Do YY')} -
                        {moment(el).format('MMM Do YY')}
                      </Text>
                      <ProgressBar progress={getDays(el, index) / 40} />
                    </View>
                    <Text category="s2">{getDays(el, index)} days</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <Text category="p1">
              The average period lasts{' '}
              <Text category="s1">{data?.[currentDay]?.user?.periodLength} days</Text>
            </Text>
            <ScrollView style={{flex: 1, maxHeight: 175}}>
              <View style={styles.container}>
                {sortedArrayPeriods?.map((el, index) => (
                  <View style={styles.viewItem} key={el}>
                    <View style={styles.progressBar}>
                      <Text category="p2">
                        {moment(sortedArray[index]).format('MMM Do YY')} -
                        {moment(el).format('MMM Do YY')}
                      </Text>
                      <ProgressBar progress={(getDays(el, index) + 1) / 10} size="small" />
                    </View>
                    <Text category="s2">{getDays(el, index) + 1} days</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <Button status="basic" appearance="ghost" accessoryLeft={LogOutIcon} onPress={logOut}>
            Log out
          </Button>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
export default PartnerPage;

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
  item: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    maxHeight: 300,
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
});
