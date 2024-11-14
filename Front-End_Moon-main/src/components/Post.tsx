import {Divider, Text} from '@ui-kitten/components';
import {Image} from 'expo-image';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {PostImages} from '../constants';

const Post = ({post, setVisible, setSelectedUser}) => {
  return (
    <View style={styles.post}>
      <Image style={{...styles.radius, height: 200}} source={PostImages[post?.image]} />
      <Text category="h6">{post?.title}</Text>
      <Text category="p2">{post?.description}</Text>
      {setSelectedUser && (
        <TouchableOpacity
          onPress={() => {
            setSelectedUser(post?.userId);
            setVisible(true);
          }}>
          <Text category="s2">by {post?.by}</Text>
        </TouchableOpacity>
      )}
      <Divider style={{marginTop: 20}} />
    </View>
  );
};
export default Post;
const styles = StyleSheet.create({
  radius: {
    borderRadius: 10,
  },
  post: {
    padding: 0,
    margin: 0,
    display: 'flex',
    borderRadius: 10,
    gap: 10,
  },
});
