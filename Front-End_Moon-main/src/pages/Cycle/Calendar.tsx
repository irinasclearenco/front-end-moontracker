import {useQueryClient} from '@tanstack/react-query';
import {Layout} from '@ui-kitten/components';
import moment from 'moment';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';

import ItemComponent from '../../components/ItemComponent';
import SymptomsModal from '../../components/Modal/SymptomsModal';
import PregnansyItem from '../../components/PregnansyItem';
import {useGetCycles} from '../../hooks/api/useGetCycles';
import {useMarkNewCycle} from '../../hooks/api/useMarkNewCycle';
import {User} from '../../services/interfaces';

const currentDay = moment().format('YYYY-MM-DD').toString();

const Calendar = () => {
  const queryClient = useQueryClient();
  const userData: User = queryClient.getQueryData(['profile']);
  // const {data: userData} = useGetProfile();

  const {data, isFetching} = useGetCycles();
  const {mutateAsync} = useMarkNewCycle();
  // const dataItems = useSevenDayData();
  const [items, setItems] = useState<AgendaSchedule>({});
  const [visible, setVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');

  const marketDates = useMemo(() => {
    if (data && !isFetching) {
      return Object.keys(data).reduce((newMap, currentDate) => {
        const {id, userId, cycleDay, symptoms, text, phase, lmp, edd, img, date, ...rest} =
          data[currentDate];
        if (phase === 'Pregnancy') {
          newMap[currentDate] = {
            ...rest,
            marked: !!symptoms.length,
            dotColor: 'white',
            endingDay: true,
            startingDay: true,
          };
        } else {
          newMap[currentDate] = {
            ...rest,
            marked: !!symptoms.length,
            dotColor: 'white',
          };
        }
        return newMap;
      }, {});
    }
    return {};
  }, [data, isFetching]);

  const loadItems = useCallback(
    (day: DateData) => {
      const copyitems = items || {};
      setTimeout(() => {
        for (let i = -15; i < 15; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!copyitems[strTime]) {
            copyitems[strTime] = [];
            copyitems[strTime].push({
              name: '',
              height: 100,
              day: strTime,
            });
          }
        }
        const newItems: AgendaSchedule = {};
        Object.keys(items).forEach(key => {
          newItems[key] = items[key];
        });
        setItems(prevState => ({...prevState, ...newItems}));
      }, 300);
    },
    [items],
  );

  const handlePeriodMark = useCallback(
    day => {
      mutateAsync(day);
    },
    [mutateAsync],
  );
  const handleAddSymptoms = useCallback(day => {
    setSelectedDay(day);
    setVisible(true);
  }, []);

  const renderItem = useCallback(
    (reservation: AgendaEntry) => (
      <ItemComponent
        reservation={reservation}
        currentDay={currentDay}
        handlePeriodMark={handlePeriodMark}
        handleAddSymptoms={handleAddSymptoms}
        cycles={data}
      />
    ),
    [currentDay, handleAddSymptoms, handlePeriodMark, data],
  );
  const renderPregnancy = useCallback(
    (reservation: AgendaEntry) => (
      <PregnansyItem
        reservation={reservation}
        currentDay={currentDay}
        handleAddSymptoms={handleAddSymptoms}
        cycles={data}
        handlePeriodMark={handlePeriodMark}
      />
    ),
    [currentDay, handleAddSymptoms, handlePeriodMark, data],
  );
  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  // const rowHasChanged = useCallback((r1, r2) => {
  //   console.log(r1.day, 'r1');
  //   console.log(r2.day, 'r2');
  //   console.log(r1.day !== r2.day, 'rowHasChanged');
  //   return r1.day !== r2.day; // replace someProperty with actual data to compare
  // }, []);
  return (
    <Layout style={styles.container}>
      <SymptomsModal
        setVisible={setVisible}
        visible={visible}
        selectedDay={selectedDay}
        cycles={data}
      />
      <Agenda
        firstDay={1}
        animateScroll
        items={items}
        loadItemsForMonth={loadItems}
        selected={currentDay}
        renderItem={r => {
          return userData?.goal === 'MONITORING_PREGNANCY' && data?.[r.day]?.phase === 'Pregnancy'
            ? renderPregnancy(r)
            : renderItem(r);
        }}
        rowHasChanged={() => !isFetching}
        showClosingKnob
        pastScrollRange={50}
        futureScrollRange={50}
        markingType="period"
        markedDates={marketDates}
        theme={{agendaTodayColor: data?.[currentDay]?.color || 'gray'}}
      />
    </Layout>
  );
};
export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
