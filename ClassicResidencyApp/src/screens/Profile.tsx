import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';

import {ICONS, COLORS, SIZES} from '../resources';
import MainView from '../components/MainView';
import {FONTS, SHADOW, SHADOW_PRIMARY} from '../resources/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Banner from '../components/Banners';
import Icon, {Icons} from '../components/Icons';
const {width} = Dimensions.get('screen');
const places = [
  {
    id: '1',
    name: 'Lago di Braies, Braies',
    location: 'Italy',
    image: require('../assets/location1.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '2',
    name: 'Siargao island',
    location: 'Philippines',
    image: require('../assets/location2.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '3',
    name: 'Manarola',
    location: 'Italy',
    image: require('../assets/location3.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '4',
    name: 'Perhentian Islands',
    location: 'Malaysia',
    image: require('../assets/location4.jpg'),
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
];

const TabArr = [
  {
    route: 'Home',
    label: 'About Us',
    type: Icons.MaterialIcons,
    icon: 'house',
  },
  {
    route: 'Search',
    label: 'Contact Us',
    type: Icons.MaterialIcons,
    icon: 'search',
  },
  {
    route: 'Add',
    label: 'All Complaints',
    type: Icons.MaterialIcons,
    icon: 'add',
  },
  {
    route: 'Like',
    label: 'Manage Notice',
    type: Icons.AntDesign,
    icon: 'heart',
  },
  {
    route: 'Account',
    label: 'Manage Members',
    type: Icons.FontAwesome,
    icon: 'user-circle-o',
  },
  {
    route: 'Account',
    label: 'Logout',
    type: Icons.FontAwesome,
    icon: 'user-circle-o',
  },
];
const Profile = ({navigation}: any) => {
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
          <View style={{height: SIZES.height * 0.08}}></View>
          <View
            style={{
              width: '95%',
              borderRadius: 20,
              backgroundColor: COLORS.white,

              alignSelf: 'center',
              marginBottom: SIZES.height * 0.15,
              padding: '5%',
              ...SHADOW,
            }}>
            {TabArr.map(item => {
              return (
                <TouchableOpacity
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    paddingVertical: '5%',
                    // borderBottomWidth: 1,
                    alignItems: 'center',
                  }}>
                  <Icon type={item.type} name={item.icon} color={COLORS.gray} />
                  <Text
                    style={{
                      marginLeft: 10,
                      ...FONTS.body3,
                      color: COLORS.gray,
                      flex: 1,
                    }}>
                    {item.label}
                  </Text>
                  <Icon
                    type={Icons.Ionicons}
                    name={'ios-chevron-forward'}
                    color={COLORS.gray}
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

          marginTop: Platform.OS == 'ios' ? 100 : 90,
        }}>
        <TouchableOpacity activeOpacity={0.9} style={style.inputContainer}>
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
    // borderBottomLeftRadius: 40,
    // borderBottomRightRadius: 40,
    // overflow: 'hidden',
  },
  headerTitle: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  inputContainer: {
    zIndex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: '-15%',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
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
