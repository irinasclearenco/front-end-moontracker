import {FC, useState} from 'react';
import {Layout, Radio, Text, ViewPager} from '@ui-kitten/components';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {routeNames} from '../../constants/routeNames';
import {Controller, useForm} from 'react-hook-form';
import {surveyData} from '../consts';
import TestLayout from '../../components/Layouts/TestLayout';

const Survey: FC = ({navigation}: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      // Set default values for each question
      ...surveyData.reduce((acc, {question, answers}) => {
        acc[`${question.replace('', '')}`] = answers[0];
        // Set the first answer as default
        return acc;
      }, {}),
    },
  });
  const onSubmit = (data: any) => {
    if (selectedIndex === surveyData.length - 1) {
      navigation.navigate(routeNames.DETAILS);
    } else {
      setSelectedIndex(prevState => prevState + 1);
    }
  };
  const onPressBack = () => {
    if (selectedIndex === 0) {
      navigation.goBack();
    } else {
      setSelectedIndex(prevState => prevState - 1);
    }
  };
  return (
    <TestLayout
      onSubmit={handleSubmit(onSubmit)}
      progress={(selectedIndex + 1) / surveyData.length}
      onPressBack={onPressBack}
      onPressSkip={() => navigation.navigate(routeNames.DETAILS)}>
      <ViewPager
        style={styles.viewPager}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {surveyData.map(({question, answers}) => (
          <Layout style={styles.container} key={question}>
            <Text category="h4" style={styles.text}>
              {question}
            </Text>
            <View style={styles.view2}>
              {answers.map(answer => (
                <Controller
                  control={control}
                  name={`${question.replace('', '')}` as never}
                  key={`${question}-${answer}`}
                  render={({field: {onChange, value}}) => {
                    return (
                      <Radio
                        status="danger"
                        checked={value === answer}
                        onChange={() => {
                          onChange(answer);
                        }}>
                        {answer}
                      </Radio>
                    );
                  }}
                />
              ))}
            </View>
          </Layout>
        ))}
      </ViewPager>
    </TestLayout>
  );
};
export default Survey;
const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  text: {
    textAlign: 'center',
  },
  view: {
    alignItems: 'center',
    gap: 20,
  },
  view2: {
    width: 300,
    gap: 20,
  },
});
