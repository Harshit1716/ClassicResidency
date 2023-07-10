import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {useAppSelector} from '../stateManagemer/Store';
import SearchBar from '../components/SearchBar';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon, {Icons} from '../components/Icons';
import CreateNoticeModal from '../components/CreateNoticeModal';
import CreateMemberModal from '../components/CreateMemberModal';
import MainView from '../components/MainView';
import {redirectToPhoneNumber} from '../resources/Utils';

const MembersList = () => {
  const isAdmin = useAppSelector(state => state.userReducer.isAdmin);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
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
            size={15}
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
            size={35}
            type={Icons.MaterialCommunityIcons}
            name={'delete'}
            color={'red'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMainItem = ({item, index}: any) => {
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
          source={ICONS.PROFILE_ICON}></Image>
        <View style={{flex: 1, paddingHorizontal: '5%'}}>
          <Text style={{...FONTS.h3}}>Name</Text>
          <Text style={{...FONTS.body5, color: COLORS.gray}}>
            Contact No:- 9355209292
          </Text>
          <Text style={{...FONTS.body5, color: COLORS.gray}}>AOA</Text>
        </View>
        <TouchableOpacity
          onPress={() => redirectToPhoneNumber('9355209292')}
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
        rightIconType={!isAdmin ? 'CREATE' : 'NONE'}
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
          placeholder={'Search Notice ...'}
          onChangeText={text => {
            setInput(text);
          }}
          value={input}
          shadow={'DEFAULT'}
        />
      </View>
      <View style={{marginTop: 20}}></View>

      {!isAdmin ? (
        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 81, 213, 321, 142, 142412]}
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
          data={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 123, 131, 231, 231231, 1231231,
          ]}
          ListFooterComponent={() => (
            <View style={{height: SIZES.height * 0.2}}></View>
          )}
          renderItem={({item, index}) =>
            renderMainItem({item, index})
          }></FlatList>
      )}
      <CreateMemberModal onClose={() => setOpen(false)} isVisible={open} />
    </MainView>
  );
};

export default MembersList;

const styles = StyleSheet.create({});
