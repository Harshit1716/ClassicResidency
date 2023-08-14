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
import React, {useEffect, useState} from 'react';
import MainView from '../components/MainView';
import Header from '../components/Header';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {getStatusColor} from '../resources/Utils';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Discussion from './Discussion';
import {Ads} from '../stateManagemer/models/SocietyAppModal';
import {getAllAds} from '../stateManagemer/slice/ServiceSlice';
import NoDataFound from '../components/NoDataFound';

interface Message {
  name: string;
  flatNo: string;
  message: string;
  image: string;
  createdOn: string;
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

const Engage = () => {
  const [postScreen, setPostScreen] = useState(false);
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const userID = useAppSelector(item => item.userReducer.id);
  const user = useAppSelector(item => item.userReducer);

  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllAds());
    }, []),
  );

  const selectorBtn = () => {
    return (
      <View
        style={{
          marginTop: 20,
          borderRadius: 10,
          height: SIZES.height * 0.05,
          width: '90%',
          backgroundColor: COLORS.white,
          alignSelf: 'center',
          flexDirection: 'row',
          marginBottom: 20,
          ...SHADOW,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (postScreen) setPostScreen(false);
          }}
          style={{
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: SIZES.height * 0.05,
            // width: '80%',
            flex: 1,
            backgroundColor: postScreen ? COLORS.white : COLORS.primary,
            alignSelf: 'center',
            ...SHADOW,
          }}>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.h3,
              color: !postScreen ? COLORS.white : COLORS.primary,
            }}>
            Ads
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!postScreen) setPostScreen(true);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            height: SIZES.height * 0.05,
            backgroundColor: !postScreen ? COLORS.white : COLORS.primary,
            alignSelf: 'center',
            flex: 1,
            ...SHADOW,
          }}>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.h3,
              color: postScreen ? COLORS.white : COLORS.primary,
            }}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem2 = ({item, index}: {item: any; index: number}) => {
    return (
      <View
        style={{
          backgroundColor: COLORS.lightPrimary,
          marginBottom: 15,
          maxWidth: '80%',
          padding: '5%',
          // width: '80%',
          borderRadius: 10,
          alignSelf: item.id === userID ? 'flex-end' : 'flex-start',
        }}>
        <Text
          style={{
            alignSelf: item.id === userID ? 'flex-end' : 'flex-start',
            ...FONTS.h3,
            color:
              item.id === userID
                ? COLORS.headerSecond
                : index % 2 == 0
                ? COLORS.green
                : COLORS.secondary,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            alignSelf: item.id === userID ? 'flex-end' : 'flex-start',
          }}>
          {userID !== item.id ? `${item.id} :-` : ''} {item.text}
        </Text>
        <Text
          style={{
            fontSize: 10,
            alignSelf: item.id === userID ? 'flex-end' : 'flex-start',
          }}>
          -{item.date}
        </Text>
      </View>
    );
  };
  const renderItem = ({item, index}: {item: Ads; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddDetail', {data: item});
        }}
        style={{
          marginTop: index == 0 ? 20 : 0,
          padding: '5%',
          backgroundColor: COLORS.white,
          ...SHADOW,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: COLORS.lightGray,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          // marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.h2, color: COLORS.primary}}>
              {item.name}
            </Text>
          </View>
          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: getStatusColor('Closed'),
              borderRadius: 5,
              height: 30,
              paddingHorizontal: '2%',
            }}>
            <Text
              style={{
                ...FONTS.body7,
                textAlign: 'center',
                marginBottom: -5,
                color: COLORS.white,
              }}>
              {item.id}
            </Text>
          </View> */}
        </View>
        <Text numberOfLines={2} style={{...FONTS.h4, color: COLORS.black}}>
          {item.text1}
        </Text>
        <Image
          source={{uri: item.banner + ''}}
          resizeMode="cover"
          style={{
            height: 200,
            width: '100%',
            borderRadius: 10,
            marginVertical: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={{...FONTS.body4, color: COLORS.black}}>
                Contact : {item.number}
              </Text>
            </View>
          </View>
        </View>
        {/* <Text style={{...FONTS.body5, color: COLORS.black}}>
          Visits :{' '}
          <Image
            style={{height: 20, width: 20}}
            source={ICONS.ACCOUNT_TAB_ICON}
          />{' '}
          90
        </Text> */}
      </TouchableOpacity>
    );
  };

  const renderAdsScreen = () => {
    return (
      <MainView style={{flex: 1}}>
        <StatusBar translucent={false} backgroundColor={COLORS.primary} />
        {user.adsList.length != 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[...user.adsList]}
            ListFooterComponent={() => {
              return <View style={{height: SIZES.height * 0.45}}></View>;
            }}
            renderItem={renderItem}
          />
        ) : (
          <>{renderNoData()}</>
        )}
      </MainView>
    );
  };

  const renderNoData = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{height: '20%', width: '50%', marginTop: '-20%'}}
          source={ICONS.NO_DATA_ICON}
        />
      </View>
    );
  };

  return (
    <MainView>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <Header
        hideBackIcon={true}
        title={'Engage'}
        iconPress={() => {
          if (!postScreen) {
            navigation.navigate('CreateAdd');
          }
        }}
        rightIconType={
          user.block == 'Z' ? (postScreen ? 'NONE' : 'CREATE') : 'NONE'
        }
      />
      {selectorBtn()}
      {!postScreen ? (
        <>{renderAdsScreen()}</>
      ) : (
        <View style={{flex: 1}}>
          <Discussion />
        </View>
      )}
    </MainView>
  );
};

export default Engage;

const styles = StyleSheet.create({});
