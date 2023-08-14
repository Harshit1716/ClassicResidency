import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MainView from '../components/MainView';
import Header from '../components/Header';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {getStatusColor} from '../resources/Utils';
import {useAppSelector} from '../stateManagemer/Store';
import {useNavigation} from '@react-navigation/native';
import Database from '@react-native-firebase/database';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';
interface Message {
  name: string;
  flatNo: string;
  flatId: string;
  text: string;
  createdOn: any;
}

const dataSet3 = [
  {
    date: '8/13/2023',
    name: 'Prakash Raj',
    id: 'ZSUPER000',
    text: 'This is super admin app',
  },
  {date: '8/13/2023', name: 'Prakash Raj', id: 'AAOA000', text: 'Pppppp'},
  {date: '8/13/2023', name: 'Prakash Raj', id: 'AAOA000', text: 'Hahaha'},
  {
    date: '8/13/2023',
    name: 'Prakash Raj',
    id: 'AAOA000',
    text: 'Aoa meeting is going on so everybody else have to wait 😎',
  },
  {
    date: '8/11/2023',
    id: 'AAOA000',
    text: 'Currenctly dont have any memeber so cant process',
  },
  {
    date: '8/13/2023',
    name: 'Prakash Raj',
    id: 'ZSUPER000',
    text: 'This is super admin app',
  },
  {date: '8/13/2023', name: 'Prakash Raj', id: 'AAOA000', text: 'Pppppp'},
  {date: '8/13/2023', name: 'Prakash Raj', id: 'AAOA000', text: 'Hahaha'},
  {
    date: '8/13/2023',
    name: 'Prakash Raj',
    id: 'AAOA000',
    text: 'Aoa meeting is going on so everybody else have to wait 😎',
  },
  {
    date: '8/11/2023',
    id: 'AAOA000',
    text: 'Currenctly dont have any memeber so cant process',
  },
];

const Discussion = () => {
  const [postScreen, setPostScreen] = useState(false);
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const userID = useAppSelector(item => item.userReducer.id);
  const user = useAppSelector(item => item.userReducer);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paginationKey, setPaginationKey] = useState(null);
  const flatListRef = useRef(null);
  useEffect(() => {
    const messagesRef = Database().ref('messages');

    const query = messagesRef.orderByKey();
    // .limitToLast(10) // Load the latest 10 messages
    // .endAt(paginationKey);
    const messageListener = query.on('value', snapshot => {
      const newMessages: any = [];
      snapshot.forEach(childSnapshot => {
        return newMessages.unshift({
          key: childSnapshot.key,
          text: childSnapshot.val().text,
          name: childSnapshot.val().name,
          flatNo: childSnapshot.val().flatNo,
          flatId: childSnapshot.val().flatId,
          createdOn: childSnapshot.val().timestamp,
        });
      });
      setMessages(newMessages.reverse());
      if (flatListRef != null) {
      }
      setIsLoading(false);
    });

    return () => {
      query.off('value', messageListener);
    };
  }, [paginationKey]);

  const loadMoreMessages = () => {
    if (messages.length > 0) {
      setIsLoading(true);
      setPaginationKey(messages[messages.length - 1].key);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      let obj: Message = {
        name:
          user.currentUser === user.phoneNumber
            ? user.ownerName
            : user.tenantEmail,
        flatNo: `${user.block}-${user.flatType}-${user.flatNumber}`,
        flatId: user.id,
        text: newMessage,
        createdOn: new Date().toLocaleDateString(),
      };
      Database().ref('messages').push(obj);
      setNewMessage('');
    }
  };

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const renderItem2 = ({item, index}: {item: Message; index: number}) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.lightPrimary,
          marginBottom: 15,
          maxWidth: '80%',
          padding: '5%',
          //   width: '80%',
          borderRadius: 10,
          alignSelf: item.flatId === userID ? 'flex-end' : 'flex-start',
        }}>
        <Text
          style={{
            alignSelf: item.flatId === userID ? 'flex-end' : 'flex-start',
            ...FONTS.h4,
            color:
              item.flatId === userID
                ? COLORS.headerSecond
                : index % 2 == 0
                ? COLORS.green
                : COLORS.secondary,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            alignSelf: item.flatId === userID ? 'flex-end' : 'flex-start',
            color: COLORS.gray,
          }}>
          {item.flatNo}
        </Text>
        <Text
          style={{
            alignSelf: item.flatId === userID ? 'flex-end' : 'flex-start',
            color: COLORS.black,
            ...FONTS.body3,
          }}>
          {item.text}
        </Text>
        <Text
          style={{
            fontSize: 10,
            alignSelf: item.flatId === userID ? 'flex-end' : 'flex-start',
          }}>
          -{formatTimestamp(item.createdOn)}
        </Text>
      </View>
    );
  };

  return (
    // <LinearGradient
    //   colors={['#606c88', '#3f4c6b']}
    //   style={{flex: 1}}
    //   start={{x: 0, y: 0.5}}
    //   end={{x: 1, y: 0.5}}
    //   locations={[0, 0.7]}>
    <View
      style={{
        flex: 1,
        padding: '5%',
      }}>
      <FlatList
        ref={flatListRef}
        style={{height: SIZES.width * 0.5}}
        showsVerticalScrollIndicator={false}
        data={[...messages]}
        initialScrollIndex={messages.length - 1}
        ListFooterComponent={() => {
          return <View style={{height: SIZES.height * 0.35}}></View>;
        }}
        renderItem={renderItem2}
      />
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.height * 0.15,
          alignSelf: 'center',
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
        }}>
        <View
          style={{
            ...FONTS.h2,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            paddingHorizontal: '5%',
            backgroundColor: COLORS.white,
            borderRadius: 10,
            flex: 1,
            marginRight: 10,
          }}>
          <TextInput
            value={newMessage}
            onChangeText={text => setNewMessage(text)}
            multiline
            placeholder="Enter your comment ..."
            style={{
              backgroundColor: COLORS.white,
              maxHeight: SIZES.height * 0.3,
              paddingVertical: 10,
              width: '100%',
              flex: 1,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            sendMessage();
          }}>
          <Image
            resizeMode="contain"
            style={{height: 30, width: 30, tintColor: COLORS.primary}}
            source={ICONS.SEND_ICON}
          />
        </TouchableOpacity>
      </View>
      {isLoading && <Loader />}
    </View>
    // </LinearGradient>
  );
};

export default Discussion;

const styles = StyleSheet.create({});
