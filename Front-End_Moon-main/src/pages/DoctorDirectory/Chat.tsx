import {Avatar, Layout, Text, TopNavigation} from '@ui-kitten/components';
import React, {FC, useCallback, useState} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

import DoctorInformation from '../../components/Modal/DoctorInformation';
import UserInformation from '../../components/Modal/UserInformation';
import {useGetMessages} from '../../hooks/api/useGetMessages';
import {useGetUserById} from '../../hooks/api/useGetUserById';
import {usePostMessage} from '../../hooks/api/usePostMessage';
import {useChatNotification} from '../../hooks/useChatNotification';
import {socket} from '../../services/consts';

const doctorImage = require('../../assets/Avatars/doctor.jpeg');
const moonImage = require('../../assets/Avatars/moon.jpeg');

const Chat: FC<any> = ({navigation, route}) => {
  const {id, userData} = route?.params;
  const {data, isPending, isLoading} = useGetMessages(id, userData?.id);
  const {data: chatUser} = useGetUserById(id);
  useChatNotification(id);
  const {mutateAsync} = usePostMessage();

  const [visible, setVisible] = useState(false);

  const roomId = `${Math.min(userData?.id, id)}_${Math.max(userData?.id, id)}`;

  const handleMessageSend = async (message: string) => {
    await mutateAsync({senderId: userData?.id, receiverId: id, message});
    chatUser?.name &&
      socket.emit('message', {roomId, text: message, name: userData?.name, receiverId: id});
  };

  const renderCloseAction = useCallback(
    () => (
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Avatar source={chatUser?.role === 'USER' ? moonImage : doctorImage} />
      </TouchableOpacity>
    ),
    [setVisible, chatUser?.role],
  );

  return (
    <Layout style={{flex: 1}}>
      {chatUser?.role === 'USER' && chatUser?.id && visible ? (
        <UserInformation visible={visible} setVisible={setVisible} userData={chatUser} />
      ) : (
        chatUser?.id &&
        visible && (
          <DoctorInformation
            visible={visible}
            setVisible={setVisible}
            userDataId={chatUser?.id}
            navigation={navigation}
            currentUser={userData}
          />
        )
      )}
      <TopNavigation
        alignment="center"
        accessoryLeft={renderCloseAction}
        title={chatUser?.name}
        subtitle={chatUser?.role === 'USER' && chatUser?.goal}
        style={{marginTop: 40}}
      />
      <SafeAreaView style={{flex: 1}}>
        {isLoading || isPending ? (
          <Text>loading</Text>
        ) : (
          <GiftedChat
            showAvatarForEveryMessage
            messages={data?.length ? data : []}
            user={{
              _id: userData?.id,
              name: userData?.name,
            }}
            renderLoading={() => isPending && <Text>loading</Text>}
            onSend={messages => handleMessageSend(messages[0].text)}
          />
        )}
      </SafeAreaView>
    </Layout>
  );
};

export default Chat;
