import {useQueryClient} from '@tanstack/react-query';
import {
  Button,
  Divider,
  Input,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {Image} from 'expo-image';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import PagerView from 'react-native-pager-view';

import {CloseIcon} from '../../assets/Icons';
import DoctorInformation from '../../components/Modal/DoctorInformation';
import Post from '../../components/Post';
import {PostImages} from '../../constants';
import {useCreatePost} from '../../hooks/api/useCreatePost';
import {useGetPosts} from '../../hooks/api/useGetPosts';
import {User} from '../../services/interfaces';

const CreatePosts = ({navigation}) => {
  const queryClient = useQueryClient();
  const userData: User = queryClient.getQueryData(['profile']);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const {mutateAsync} = useCreatePost();
  const {data} = useGetPosts();

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const renderCloseAction = () => (
    <TopNavigationAction icon={CloseIcon} onPress={() => navigation.goBack()} />
  );
  const handlePost = async data => {
    await mutateAsync({
      ...data,
      by: userData?.name,
      image: selectedIndex,
      userId: userData?.id,
    });
    reset();
  };
  return (
    <Layout style={styles.container}>
      {visible && (
        <DoctorInformation
          visible={visible}
          setVisible={setVisible}
          userDataId={selectedUser}
          navigation={navigation}
          currentUser={userData}
        />
      )}
      <TopNavigation
        alignment="center"
        accessoryLeft={renderCloseAction}
        title="Create Article"
        style={{marginTop: 40}}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{...styles.container, gap: 20}}>
          <View style={styles.view}>
            <PagerView
              style={{height: 200}}
              initialPage={0}
              onPageSelected={e => setSelectedIndex(e.nativeEvent.position)}>
              {PostImages.map((image, index) => (
                <Image key={index} style={{borderRadius: 20}} source={image} />
              ))}
            </PagerView>
            <Controller
              name="title"
              control={control}
              rules={{required: 'Title is required'}}
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Title"
                  value={value}
                  caption={errors.title?.message}
                  onChangeText={onChange}
                  style={styles.radius}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{required: 'Description is required'}}
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Description"
                  multiline
                  value={value}
                  caption={errors.description?.message}
                  onChangeText={onChange}
                  style={{minHeight: 50, ...styles.radius}}
                />
              )}
            />
            <Button
              onPress={handleSubmit(data => handlePost(data))}
              appearance="outline"
              style={styles.radius}>
              Post
            </Button>
          </View>
          <View style={styles.viewPost}>
            <Divider />
            {data?.map((post, index) => (
              <Post
                post={post}
                key={index}
                setVisible={setVisible}
                setSelectedUser={setSelectedUser}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
export default CreatePosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    display: 'flex',
    padding: 20,
    gap: 15,
  },
  radius: {
    borderRadius: 10,
  },
  viewPost: {
    flex: 1,
    display: 'flex',
    padding: 20,
    gap: 30,
  },
});
