import {Layout, Text} from '@ui-kitten/components';
import {
  Animated,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {useRef} from 'react';
const AnimatedFlatList = ({itemHeight, items, setLength}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const modifiedItems = ['', ...items, ''];
  const renderItem = ({item, index}: ListRenderItemInfo<string>) => {
    const inputRange = [(index - 2) * itemHeight, (index - 1) * itemHeight, index * itemHeight];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    return (
      <Animated.View style={[{height: itemHeight, transform: [{scale}]}, styles.animatedContainer]}>
        <Text style={styles.pickerItem}>{item}</Text>
      </Animated.View>
    );
  };
  const momentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    setLength(items[index]);
  };
  return (
    <Layout style={{...styles.animatedContainer, height: itemHeight * 3}}>
      <Animated.FlatList
        data={modifiedItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        onMomentumScrollEnd={momentumScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
          useNativeDriver: true,
        })}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
      />
      <View style={[styles.indicatorHolder, {top: itemHeight}]}>
        <View style={[styles.indicator]} />
        <View style={[styles.indicator, {marginTop: itemHeight}]} />
      </View>
    </Layout>
  );
};
export default AnimatedFlatList;
const styles = StyleSheet.create({
  pickerItem: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
    width: 120,
  },
  viewItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'gray',
    padding: 14,
    borderRadius: 10,
  },
  indicatorHolder: {
    position: 'absolute',
  },
  indicator: {
    width: 120,
    height: 1,
    backgroundColor: '#ccc',
  },
  animatedContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    paddingTop: 50,
    gap: 20,
  },
  item: {
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
