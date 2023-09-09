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
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {logout, logoutUser} from '../stateManagemer/slice/ServiceSlice';
import ChangePasswordModal from '../components/ChangePasswordModal';
// import Icon, {Icons} from '../components/Icons';
const {width} = Dimensions.get('screen');

const Profile = ({navigation}: any) => {
  const disptach = useAppDispatch();
  const user = useAppSelector(state => state.userReducer);
  const [open, setOpen] = useState(false);
  const TabArr = [
    {
      route: 'Home',
      label: 'About Us',
      icon: 'house',
      onPress: () => {
        navigation.navigate('AboutUs');
      },
    },
    // {
    //   route: 'Search',
    //   label: 'Contact Us',
    //   icon: 'search',
    //   onPress: () => {
    //     navigation.navigate('ContactUs');
    //   },
    // },
    {
      route: 'AllComplaints',
      label: 'All Complaints',
      icon: 'add',
      onPress: () => {
        navigation.navigate('AllComplaints');
      },
    },
    {
      route: 'Directory',
      label: 'Directory',
      icon: 'add',
      onPress: () => {
        navigation.navigate('Directory');
      },
    },
    {
      route: 'ChangePassword',
      label: 'Change Password',
      icon: 'add',
      onPress: () => {
        setOpen(true);
      },
    },
    {
      route: 'Account',
      label: 'Logout',
      icon: 'user-circle-o',
      onPress: () => {
        disptach(logoutUser(user.id));
      },
    },
  ];
  const TabArr2 = [
    {
      label: 'About Us',
      icon: 'house',
      onPress: () => {
        console.log('AboutUs');
        navigation.navigate('AboutUs');
      },
    },
    // {
    //   label: 'Contact Us',
    //   icon: 'search',
    //   onPress: () => {
    //     navigation.navigate('ContactUs');
    //   },
    // },
    {
      route: 'ChangePassword',
      label: 'Change Password',
      icon: 'add',
      onPress: () => {
        setOpen(true);
      },
    },
    {
      label: 'Logout',
      icon: 'user-circle-o',
      onPress: () => {
        disptach(logoutUser(user.id));
      },
    },
  ];
  return (
    <MainView>
      <View style={{flex: 1}}>
        <StatusBar translucent={false} backgroundColor={COLORS.primary} />

        <View style={style.header}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.headerSecond]}
            style={{flex: 1}}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            locations={[0, 0.7]}>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: Platform.OS == 'ios' ? 40 : 25,
                paddingBottom: 10,
                height: SIZES.height * 0.15,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                // alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    marginRight: 10,
                  }}
                  source={
                    user.currentUser === user.phoneNumber
                      ? user.imageUrl
                        ? {uri: user.imageUrl + ''}
                        : ICONS.PROFILE_ICON
                      : user.tenantImage
                      ? {uri: user.tenantImage + ''}
                      : ICONS.PROFILE_ICON
                  }
                />
                <View>
                  <Text style={style.headerTitle}>
                    {user.block + '-' + user.flatType + '-' + user.flatNumber}
                  </Text>
                  <Text style={{color: COLORS.white, ...FONTS.h3}}>
                    {user.currentUser === user.phoneNumber
                      ? user.ownerName
                      : user.tenantName}
                  </Text>
                </View>
              </View>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>
                {new Date().toDateString()}
              </Text>
              {/* <TouchableOpacity>
              <Image
                style={{height: 40, width: 40, tintColor: COLORS.white}}
                source={ICONS.NOTIFICATION_ICON}
              />
            </TouchableOpacity> */}
            </View>
          </LinearGradient>
        </View>

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

        <ScrollView
          style={{flex: 1, backgroundColor: COLORS.lightGray1, marginTop: 10}}>
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
            {(user.isAOA || user.isAdmin ? TabArr : TabArr2).map(item => {
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
        {open && (
          <ChangePasswordModal
            open={true}
            isVisible={open}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}
      </View>
    </MainView>
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
    zIndex: 1,
    width: '90%',
    // width: Platform.OS == 'ios' ? (SIZES.height > 812 ? '90%' : '85%') : '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    // paddingVertical: Platform.OS == 'ios' ? (SIZES.height > 812 ? 15 : 12) : 15,
    alignItems: 'center',
    ...SHADOW_PRIMARY,
    // ...SHADOW,
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
