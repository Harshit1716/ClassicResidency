import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import Database from '@react-native-firebase/database';
import {SIZES} from '../resources';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paginationKey, setPaginationKey] = useState(null);

  useEffect(() => {
    const messagesRef = Database().ref('messages');

    const query = messagesRef
      // .orderByKey()
      .limitToLast(10) // Load the latest 10 messages
      .endAt(paginationKey);

    const messageListener = query.on('value', snapshot => {
      const newMessages: any = [];
      snapshot.forEach(childSnapshot => {
        newMessages.unshift({
          key: childSnapshot.key,
          text: childSnapshot.val().text,
          timestamp: childSnapshot.val().timestamp,
        });
      });
      setMessages(newMessages);
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

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      Database().ref('messages').push({
        text: newMessage,
        timestamp: Database.ServerValue.TIMESTAMP,
      });
      setNewMessage('');
    }
  };

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          padding: 16,
          height: SIZES.height * 0.5,
          marginBottom: 200,
        }}>
        <FlatList
          inverted
          data={messages}
          renderItem={({item}) => (
            <View style={{marginVertical: 4}}>
              <Text>{item?.text}</Text>
            </View>
          )}
          ListFooterComponent={
            <Button
              title="Load More"
              onPress={loadMoreMessages}
              disabled={isLoading}
            />
          }
        />
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;
