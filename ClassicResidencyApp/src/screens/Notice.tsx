import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
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
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {Notice} from '../stateManagemer/models/SocietyAppModal';
import {SwipeListView} from 'react-native-swipe-list-view';
import {deleteNotice, getAllNotice} from '../stateManagemer/slice/ServiceSlice';
import NoDataFound from '../components/NoDataFound';
// import Icon, {Icons} from '../components/Icons';

const NoticeList = () => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const isLoading = useAppSelector(state => state.userReducer.loading);
  const isAdmin = useAppSelector(state => state.userReducer.isAdmin);
  const isAOA = useAppSelector(state => state.userReducer.isAOA);
  const noticeList = useAppSelector(state => state.userReducer.notice);
  const [noticeFilteredList, setNoticeFilteredList] = useState<Notice[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const onRefresh = async () => {
    await dispatch(getAllNotice());
    setRefreshing(false);
  };
  useEffect(() => {
    dispatch(getAllNotice());
  }, []);
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

  const deleteRow = async (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const prevIndex = noticeFilteredList.findIndex(
      item => item?.key === rowKey,
    );
    // console.log(noticeFilteredList[prevIndex]);
    await dispatch(deleteNotice(noticeFilteredList[prevIndex].id));
    await dispatch(getAllNotice());
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
          <Image
            source={ICONS.CANCEL_ICON}
            style={{height: 20, width: 20, tintColor: COLORS.white}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => deleteRow(rowMap, data.item.key)}>
          <Image
            resizeMode="contain"
            source={ICONS.DELETE_ICON}
            style={{height: 40, width: 40}}
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
          rightIconType={isAdmin || isAOA ? 'CREATE' : 'NONE'}
        />
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 30,
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
        {isAdmin || isAOA ? (
          <>
            {noticeFilteredList.length > 0 ? (
              <>
                <View style={{marginTop: 20}}></View>
                <SwipeListView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
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
              <NoDataFound />
            )}
          </>
        ) : (
          <>
            {noticeFilteredList.length ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                contentContainerStyle={{marginTop: 20, marginHorizontal: '2%'}}
                data={noticeFilteredList}
                renderItem={({item, index}) => {
                  return <NoticeCard item={item} index={index} />;
                }}
                ListFooterComponent={() => (
                  <View style={{height: SIZES.height * 0.05}} />
                )}
              />
            ) : (
              <NoDataFound />
            )}
          </>
        )}

        <CreateNoticeModal onClose={() => setOpen(false)} isVisible={open} />
      </View>
      {isLoading && <Loader />}
    </View>
  );
};

export default NoticeList;

const styles = StyleSheet.create({});
