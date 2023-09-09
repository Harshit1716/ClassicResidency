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
import SuspendedService from '../components/SuspendedService';
interface Message {
  name: string;
  flatNo: string;
  flatId: string;
  text: string;
  createdOn: any;
}

const Discussion = () => {
  const [suspendedService, setSuspendedScreen] = useState(false);

  const userID = useAppSelector(item => item.userReducer.id);
  const user = useAppSelector(item => item.userReducer);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paginationKey, setPaginationKey] = useState(null);
  const flatListRef = useRef(null);
  useEffect(() => {
    const messagesRef = Database().ref('messages');
    handleSuspendedScreen();
    const query = messagesRef.orderByKey();
    const messageListener = query.on('value', snapshot => {
      const newMessages: any = [];
      snapshot.forEach(childSnapshot => {
        return newMessages.unshift({
          key: childSnapshot.key,
          text: childSnapshot.val().text,
          name: childSnapshot.val().name,
          flatNo: childSnapshot.val().flatNo,
          flatId: childSnapshot.val().flatId,
          createdOn: childSnapshot.val().createdOn,
        });
      });
      console.log(newMessage, 'RECEIVED');
      setMessages(newMessages.reverse());
      if (flatListRef != null) {
      }
      setIsLoading(false);
    });

    return () => {
      query.off('value', messageListener);
    };
  }, [paginationKey]);
  const handleSuspendedScreen = async () => {
    const banRef = Database().ref('ban');
    banRef.on('value', snapshot => {
      const isBanned = snapshot.val(); // This will be a boolean value (true or false)
      setSuspendedScreen(isBanned ?? false);
    });
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
    console.log(item, 'HAHAH');
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
          -{item.createdOn}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
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
          initialScrollIndex={messages?.length > 0 ? messages.length - 1 : 0}
          ListFooterComponent={() => {
            return <View style={{height: SIZES.height * 0.35}}></View>;
          }}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(async () => {
              console.log('inside', messages.length);
              const length = messages?.length
                ? (await messages?.length) - 2
                : 0;
              flatListRef.current?.scrollToIndex({
                index: length,
                animated: true,
              });
            });
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
                color: COLORS.black,
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
      {suspendedService && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            flex: 1,
          }}>
          <SuspendedService />
        </View>
      )}
    </View>
  );
};

export default Discussion;

const styles = StyleSheet.create({});
