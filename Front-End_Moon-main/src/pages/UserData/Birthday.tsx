import {useQueryClient} from '@tanstack/react-query';
import {Button, Datepicker, Layout, Spinner, Text} from '@ui-kitten/components';
import {FC, useState} from 'react';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {CalendarIcon} from '../../assets/Icons';
import ErrorMessage from '../../components/ErrorMessage';
import {routeNames} from '../../constants/routeNames';
import {useUpdateProfile} from '../../hooks/api/useUpdateProfile';

const Birthday: FC = ({navigation}: any) => {
  const [date, setDate] = useState(new Date('2000-01-01'));
  const {mutateAsync, error, isPending} = useUpdateProfile();
  const saveBirthday = () => {
    mutateAsync({birthday: date}).then(() => {
      navigation.navigate(routeNames.SURVEY);
    });
  };
  return (
    <Layout style={styles.container}>
      <View style={styles.view}>
        <Text category="h4" style={styles.text}>
          Mark the day of your birth to make your predictions more accurate
        </Text>
        <Datepicker
          placeholder="Pick Date"
          date={date}
          min={new Date('1960-01-01')}
          max={new Date()}
          onSelect={prevDate => setDate(prevDate)}
          accessoryRight={CalendarIcon}
          style={styles.datePicker}
          status="danger"
          size="large"
        />
      </View>
      <View style={styles.viewContainer}>
        <Button style={styles.button} status="danger" onPress={saveBirthday}>
          Next
        </Button>
        {isPending && <Spinner status="danger" />}
        {error ? <ErrorMessage message={error} /> : null}
      </View>
    </Layout>
  );
};
export default Birthday;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  view: {
    gap: 40,
  },
  text: {
    textAlign: 'center',
  },
  datePicker: {
    alignSelf: 'stretch',
    width: 350,
  },
  button: {
    width: 350,
    height: 50,
    alignSelf: 'stretch',
    borderRadius: 10,
    marginBottom: 10,
  },
  viewContainer: {
    alignItems: 'center',
    height: 100,
  },
});
