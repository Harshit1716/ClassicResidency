import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import NoticeCard from '../components/NoticeCard';
import {COLORS, ICONS, SIZES} from '../resources';
import CreateNoticeModal from '../components/CreateNoticeModal';
import MainView from '../components/MainView';
import Loader from '../components/Loader';
import {useAppSelector} from '../stateManagemer/Store';
import {Notice} from '../stateManagemer/models/SocietyAppModal';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon, {Icons} from '../components/Icons';

const NoticeList = () => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const isLoading = useAppSelector(state => state.userReducer.loading);
  const isAdmin = useAppSelector(state => state.userReducer.isAdmin);
  const noticeList = useAppSelector(state => state.userReducer.notice);
  const [noticeFilteredList, setNoticeFilteredList] = useState<Notice[]>([]);

  React.useEffect(() => {
    if (noticeList) {
      let ar = noticeList.filter(item =>
        item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()),
      );
      setNoticeFilteredList(ar);
    }
  }, [input]);
  useEffect(() => {
    // Add key property to each item
    let ar = noticeList.map((item, index) => ({
      ...item,
      key: `${index}`,
    }));
    setNoticeFilteredList(ar);
  }, [noticeList]);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = ({rowMap, rowKey}: any) => {
    // closeRow(rowMap, rowKey);
    // const newData = [...listData];
    // const prevIndex = listData.findIndex(item => item.key === rowKey);
    // newData.splice(prevIndex, 1);
    // setListData(newData);
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log('This row opened', rowKey);
  };

  const renderHiddenItem = ({data, rowMap, index}: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginRight: '5%',
          alignItems: 'center',
          // marginTop: '15%',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            backgroundColor: COLORS.gray,
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() => closeRow(rowMap, data.item.key)}>
          <Icon
            size={20}
            type={Icons.FontAwesome}
            name={'close'}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          // onPress={() => deleteRow(rowMap, data.item.key)}
        >
          <Icon
            size={40}
            type={Icons.MaterialCommunityIcons}
            name={'delete'}
            color={'red'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header
          iconPress={() => setOpen(true)}
          title="Notice"
          rightIconType={!isAdmin ? 'CREATE' : 'NONE'}
        />
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 30,
            // position: 'absolute',
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
        {!isAdmin ? (
          <>
            <View style={{marginTop: 20}}></View>
            <SwipeListView
              data={noticeFilteredList}
              renderItem={({item, index}) => (
                <NoticeCard item={item} index={index} />
              )}
              renderHiddenItem={(data, rowMap) =>
                renderHiddenItem({data, rowMap})
              }
              ListFooterComponent={() => (
                <View style={{height: SIZES.height * 0.05}}></View>
              )}
              rightOpenValue={-130}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
            />
          </>
        ) : (
          <FlatList
            contentContainerStyle={{marginTop: 20, marginHorizontal: '2%'}}
            data={noticeFilteredList}
            renderItem={({item, index}) => {
              return <NoticeCard item={item} index={index} />;
            }}
            ListFooterComponent={() => (
              <View style={{height: SIZES.height * 0.05}} />
            )}
          />
        )}

        <CreateNoticeModal onClose={() => setOpen(false)} isVisible={open} />
      </View>
      {isLoading && <Loader />}
    </View>
  );
};

export default NoticeList;

const styles = StyleSheet.create({});
