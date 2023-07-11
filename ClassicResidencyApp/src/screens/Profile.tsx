import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import {ICONS, COLORS, SIZES} from '../resources';
import MainView from '../components/MainView';
import {FONTS, SHADOW, SHADOW_PRIMARY} from '../resources/Theme';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch} from '../stateManagemer/Store';
import {logout} from '../stateManagemer/slice/ServiceSlice';
// import Icon, {Icons} from '../components/Icons';
const {width} = Dimensions.get('screen');

const Profile = ({navigation}: any) => {
  const disptach = useAppDispatch();
  const TabArr = [
    {
      route: 'Home',
      label: 'About Us',
      icon: 'house',
      onPress: () => {},
    },
    {
      route: 'Search',
      label: 'Contact Us',
      icon: 'search',
      onPress: () => {},
    },
    {
      route: 'Add',
      label: 'All Complaints',
      icon: 'add',
      onPress: () => {},
    },
    {
      route: 'Like',
      label: 'Manage Notice',
      icon: 'heart',
      onPress: () => {},
    },
    {
      route: 'Account',
      label: 'Manage Members',
      icon: 'user-circle-o',
      onPress: () => {},
    },
    {
      route: 'Account',
      label: 'Logout',
      icon: 'user-circle-o',
      onPress: () => {
        disptach(logout());
      },
    },
  ];
  return (
    // <MainView>
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <StatusBar translucent={false} backgroundColor={COLORS.primary} />

        <View style={style.header}>
          <LinearGradient
            colors={[COLORS.primary, '#396afc']}
            style={{flex: 1}}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            locations={[0, 0.7]}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: Platform.OS == 'ios' ? 55 : 25,
                paddingVertical: 10,
                height: SIZES.height * 0.2,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '-15%',
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    marginRight: 10,
                  }}
                  source={ICONS.PROFILE_MEMBER_ICON}
                />
                <View>
                  <Text style={style.headerTitle}>I-H1-702</Text>
                  <Text style={{color: COLORS.white, ...FONTS.h3}}>
                    Harshit
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Image
                  style={{height: 40, width: 40, tintColor: COLORS.white}}
                  source={ICONS.NOTIFICATION_ICON}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <ScrollView
          style={{flex: 1, backgroundColor: COLORS.lightGray1}}
          //   showsVerticalScrollIndicator={false}
        >
          <View style={{height: SIZES.height * 0.07}}></View>
          <View
            style={{
              width: '95%',
              borderRadius: 20,
              backgroundColor: COLORS.white,
              alignSelf: 'center',
              marginBottom: SIZES.height * 0.18,
              padding: '5%',
              ...SHADOW,
            }}>
            {TabArr.map(item => {
              return (
                <TouchableOpacity
                  onPress={item.onPress}
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    paddingVertical: '5%',
                    // borderBottomWidth: 1,
                    alignItems: 'center',
                  }}>
                  {/* <Icon type={item.type} name={item.icon} color={COLORS.gray} /> */}
                  <Text
                    style={{
                      marginLeft: 10,
                      ...FONTS.body3,
                      color: COLORS.gray,
                      flex: 1,
                    }}>
                    {item.label}
                  </Text>
                  <Image
                    source={ICONS.FORWARD_ICON}
                    style={{height: 20, width: 20, tintColor: COLORS.gray}}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <View></View>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
          //   marginTop: '25%',

          marginTop:
            Platform.OS == 'ios' ? (SIZES.height > 812 ? 135 : 100) : 115,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
          activeOpacity={0.9}
          style={style.inputContainer}>
          <Image
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
              tintColor: COLORS.primary,
            }}
            source={ICONS.ACCOUNT_TAB_ICON}
          />
          <Text style={{color: COLORS.primary, ...FONTS.h3, flex: 1}}>
            Personal Details
          </Text>
          <Image
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
              tintColor: COLORS.primary,
            }}
            source={ICONS.FORWARD_ICON}
          />
        </TouchableOpacity>
      </View>
    </View>

    // </MainView>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  inputContainer: {
    marginTop: 10,
    zIndex: 1,
    width: Platform.OS == 'ios' ? (SIZES.height > 812 ? '90%' : '85%') : '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS == 'ios' ? (SIZES.height > 812 ? 15 : 12) : 15,
    alignItems: 'center',
    ...SHADOW_PRIMARY,
  },
  categoryContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    ...SHADOW,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    ...FONTS.h2,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    marginRight: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
export default Profile;
