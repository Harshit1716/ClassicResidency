import {
  Alert,
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
import Database from '@react-native-firebase/database';
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

  const suspendChat = async () => {
    const banRef = Database().ref('ban');
    let isBanned = false;
    banRef.on('value', async snapshot => {
      isBanned = await snapshot.val(); // This will be a boolean value (true or false)
      console.log('Is user banned?', isBanned);
    });
    const message = isBanned
      ? 'UN-Ban the chat service'
      : 'Ban the chat service';
    Alert.alert(
      'Alert',
      'Do you want to ' + message,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'destructive',
        },
        {
          text: 'Yes',
          onPress: () => {
            banRef
              .set(!isBanned)
              .then(() => {
                console.log('User is now banned.', !isBanned);
              })
              .catch(error => {
                console.error('Error updating ban status:', error);
              });
          },
          style: 'default',
        },
      ],
      {
        cancelable: false,
      },
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
          } else if (postScreen) {
            suspendChat();
          }
        }}
        rightIconType={
          user.block == 'Z' ? (postScreen ? 'EDIT' : 'CREATE') : 'NONE'
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
