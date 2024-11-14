import {StyleSheet, View} from 'react-native';
import {AlertIcon} from '../assets/Icons';
import {Text} from '@ui-kitten/components';

const ErrorMessage = ({message, ...props}) => {
  return (
    <View style={styles.captionContainer} {...props}>
      {AlertIcon(styles.captionIcon)}
      <Text style={styles.captionText}>{message || 'Something went wrong'}</Text>
    </View>
  );
};
export default ErrorMessage;

const styles = StyleSheet.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
});
