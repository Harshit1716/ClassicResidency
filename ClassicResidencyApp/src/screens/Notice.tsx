import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import NoticeCard from '../components/NoticeCard';
import {SIZES} from '../resources';
import CreateNoticeModal from '../components/CreateNoticeModal';

const Notice = () => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <View style={{flex: 1}}>
      <Header
        iconPress={() => setOpen(true)}
        title="Notice"
        rightIconType="CREATE"
      />
      <View
        style={{
          marginTop: SIZES.height * 0.15,
          marginHorizontal: 30,
          position: 'absolute',
          alignSelf: 'center',
          zIndex: 1,
        }}>
        <SearchBar
          searchStyle={{}}
          placeholder={'Search Notice ...'}
          onChangeText={text => {
            setInput(text);
          }}
          value={input}
          shadow={'DEFAULT'}
        />
      </View>
      <ScrollView style={{flex: 1, width: '100%', paddingVertical: '25%'}}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <NoticeCard />
        ))}
        <View style={{height: SIZES.height * 0.15}}></View>
      </ScrollView>
      <CreateNoticeModal onClose={() => setOpen(false)} isVisible={open} />
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({});
