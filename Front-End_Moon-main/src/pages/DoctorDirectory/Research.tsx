import {Divider, Layout, TopNavigation, TopNavigationAction, Text} from '@ui-kitten/components';
import React from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';

import {PlusSquareIcon} from '../../assets/Icons';
import {routeNames} from '../../constants/routeNames';
import {useBarChart} from '../../hooks/useBarChart';
import {usePieChart} from '../../hooks/usePieChart';

const screenWidth = Dimensions.get('window').width - 20;
const chartConfig = {
  backgroundColor: '#d01981',
  backgroundGradientFrom: '#f3468e',
  backgroundGradientTo: '#72ddf5',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ecf0f1',
  },
};
const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      data: [2, 4, 1, 10, 2],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Become pregnant'], // optional
};

const Research = ({navigation, users, cycles}): React.ReactElement => {
  const symptoms = useBarChart(cycles);
  const goal = usePieChart(users);

  const renderSettingsAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={PlusSquareIcon}
      onPress={() => navigation.navigate(routeNames.CREATEPOSTS)}
    />
  );
  return (
    <Layout style={styles.layout}>
      <TopNavigation title="Research" accessoryRight={renderSettingsAction} alignment="center" />
      <Divider />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={{gap: 10, padding: 10}}>
            <Text category="s1">Goal pie chart</Text>
            {goal?.length ? (
              <PieChart
                data={goal}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor="goal"
                backgroundColor="transparent"
                style={styles.chart}
                paddingLeft="0"
              />
            ) : null}
            <Text category="s1">Symptoms bar chart</Text>
            {symptoms?.labels?.length ? (
              <BarChart
                data={symptoms as any}
                width={screenWidth} // from react-native
                height={300}
                fromZero
                chartConfig={chartConfig}
                style={styles.chart}
                verticalLabelRotation={30}
                yAxisLabel=""
                yAxisSuffix=""
              />
            ) : null}
            <Text category="s1">Goal pie chart</Text>
            <LineChart
              data={data}
              width={screenWidth}
              height={300}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
export default Research;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    paddingTop: 40,
  },
  view: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
    paddingBottom: 10,
  },
});
