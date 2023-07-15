import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import SearchBar from '../components/SearchBar';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
import {SwipeListView} from 'react-native-swipe-list-view';

import CreateMemberModal from '../components/CreateMemberModal';
import MainView from '../components/MainView';
import {redirectToPhoneNumber} from '../resources/Utils';
import {Members} from '../stateManagemer/models/SocietyAppModal';
import {
  deleteMember,
  getAllMembers,
} from '../stateManagemer/slice/ServiceSlice';

const MembersList = ({route}: any) => {
  const isAdmin = useAppSelector(state => state.userReducer.isAdmin);
  const isAOA = useAppSelector(state => state.userReducer.isAOA);
  const members = useAppSelector(state => state.userReducer.members);
  const [input, setInput] = useState('');
  const [memberFilteredList, setMemberFilteredList] = useState<Members[]>([]);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (members) {
      let ar = members.filter(item =>
        item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()),
      );
      setMemberFilteredList(ar);
    }
  }, [input]);
  React.useEffect(() => {
    // Add key property to each item
    let ar = members.map((item, index) => ({
      ...item,
      key: `${index}`,
    }));
    ar = ar.filter(item => item.type == route?.params?.data);
    setMemberFilteredList(ar);
  }, [members]);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = async (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const prevIndex = memberFilteredList.findIndex(
      item => item?.key === rowKey,
    );
    console.log(memberFilteredList[prevIndex]);
    await dispatch(deleteMember(memberFilteredList[prevIndex].id));
    await dispatch(getAllMembers());
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
            padding: 5,
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
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMainItem = ({item, index}: {item: Members; index: number}) => {
    return (
      <View
        style={{
          padding: '5%',
          backgroundColor: COLORS.white,
          marginBottom: 15,
          borderRadius: 10,
          ...SHADOW,
          flexDirection: 'row',
        }}>
        <Image
          style={{height: 50, width: 50, borderRadius: 50}}
          source={{uri: item.imageUrl + ''}}></Image>
        <View style={{flex: 1, paddingHorizontal: '5%'}}>
          <Text style={{...FONTS.h3}}>{item.name}</Text>
          <Text style={{...FONTS.body5, color: COLORS.gray}}>
            Contact No:- {item.phoneNumber}
          </Text>
          <Text style={{...FONTS.body5, color: COLORS.gray}}>{item.type}</Text>
        </View>
        <TouchableOpacity
          onPress={() => redirectToPhoneNumber(item.phoneNumber + '')}
          style={{justifyContent: 'center'}}>
          <Image
            style={{height: 30, width: 30}}
            source={ICONS.CALL_ICON}></Image>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <MainView>
      <Header
        title="Members List "
        rightIconType={isAOA || isAdmin ? 'CREATE' : 'NONE'}
        iconPress={() => setOpen(true)}
      />
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 30,
          // position: 'absolute',
          backgroundColor: COLORS.lightGray1,
          alignSelf: 'center',
          zIndex: 1,
        }}>
        <SearchBar
          searchStyle={{}}
          placeholder={'Search Members ...'}
          onChangeText={text => {
            setInput(text);
          }}
          value={input}
          shadow={'DEFAULT'}
        />
      </View>
      <View style={{marginTop: 20}}></View>

      {isAOA || isAdmin ? (
        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={memberFilteredList}
          renderItem={({item, index}) => renderMainItem({item, index})}
          renderHiddenItem={(data, rowMap) => renderHiddenItem({data, rowMap})}
          ListFooterComponent={() => (
            <View style={{height: SIZES.height * 0.3}}></View>
          )}
          contentContainerStyle={{marginHorizontal: 10}}
          rightOpenValue={-130}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{margin: '5%', height: SIZES.height * 0.9}}
          data={memberFilteredList}
          ListFooterComponent={() => (
            <View style={{height: SIZES.height * 0.2}}></View>
          )}
          renderItem={({item, index}) =>
            renderMainItem({item, index})
          }></FlatList>
      )}
      <CreateMemberModal
        type={route?.params?.data}
        onClose={() => setOpen(false)}
        isVisible={open}
      />
    </MainView>
  );
};

export default MembersList;

const styles = StyleSheet.create({});
