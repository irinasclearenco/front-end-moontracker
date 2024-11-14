import {
  Button,
  Layout,
  ProgressBar,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import * as React from 'react';
import {ReactElement} from 'react';
import {StyleSheet} from 'react-native';
import {BackIcon} from '../../assets/Icons';

const TestLayout = ({children, onPressBack, onSubmit, progress, onPressSkip}) => {
  const BackAction = (): ReactElement => (
    <TopNavigationAction icon={BackIcon} onPress={onPressBack} />
  );
  const SkipAction = (): ReactElement => <Text onPress={onPressSkip}>Skip</Text>;

  return (
    <Layout style={styles.container}>
      <TopNavigation
        accessoryLeft={BackAction}
        accessoryRight={SkipAction}
        title="Back"
        style={styles.topNavigation}
      />
      <ProgressBar progress={progress} status="danger" />
      {children}
      <Button style={styles.button} status="danger" onPress={onSubmit}>
        Next
      </Button>
    </Layout>
  );
};
export default TestLayout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 350,
    height: 50,
    borderRadius: 10,
    marginBottom: 50,
    alignSelf: 'center',
  },
  topNavigation: {
    paddingTop: 50,
    paddingRight: 10,
    paddingBottom: 20,
  },
});
