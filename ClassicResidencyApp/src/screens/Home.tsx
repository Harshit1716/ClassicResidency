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
import SearchBar from '../components/SearchBar';
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

const HomeScreen = ({navigation}: any) => {
  const [list, setList] = useState(places);
  const [input, setInput] = useState('');

  useEffect(() => {
    let ar = places.filter(item =>
      item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()),
    );
    setList(ar);
  }, [input]);

  const categoryIcons = [
    <Image
      style={{height: 30, width: 30, tintColor: COLORS.primary}}
      source={ICONS.EVENT_ICON}
    />,
    <Image
      style={{height: 30, width: 30, tintColor: COLORS.primary}}
      source={ICONS.MEMBERS_ICON}
    />,
    <Image
      style={{height: 30, width: 30, tintColor: COLORS.primary}}
      source={ICONS.NOTICE_ICON}
    />,
    <Image
      style={{height: 50, width: 50, tintColor: COLORS.primary}}
      source={ICONS.BILL_ICON}
    />,
  ];
  const categoryList = [
    {
      title: 'Notice',
      Icon: (
        <Image
          style={{height: 30, width: 30, tintColor: COLORS.primary}}
          source={ICONS.NOTICE_ICON}
        />
      ),
    },
    {
      title: 'Members',
      Icon: (
        <Image
          style={{height: 30, width: 30, tintColor: COLORS.primary}}
          source={ICONS.MEMBERS_ICON}
        />
      ),
    },
    {
      title: 'Bill',
      Icon: (
        <Image
          style={{height: 50, width: 50, tintColor: COLORS.primary}}
          source={ICONS.BILL_ICON}
        />
      ),
    },
    {
      title: 'SOS',
      Icon: (
        <Image
          style={{height: 30, width: 30, tintColor: COLORS.primary}}
          source={ICONS.EVENT_ICON}
        />
      ),
    },
  ];

  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryList.map((item, index) => (
          <TouchableOpacity onPress={() => navigation.navigate(item.title)}>
            <View key={index} style={style.iconContainer}>
              {item.Icon}
            </View>
            <Text style={{marginTop: 15, ...FONTS.body7, textAlign: 'center'}}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const RecommendedCard = ({place}) => {
    return (
      <View style={style.rmCardImage}>
        <LinearGradient
          colors={['#606c88', '#3f4c6b']}
          style={{flex: 1}}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          locations={[0, 0.7]}>
          <View
            style={{
              flex: 1,
              padding: 15,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
                marginTop: 10,
              }}>
              {place.name}
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 5,
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 25, width: 25, tintColor: COLORS.white}}
                  source={ICONS.MEMBERS_ICON}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    marginLeft: 10,
                    marginTop: 5,
                  }}>
                  {place.location}
                </Text>
              </View>

              {/* </View> */}
              <Text
                numberOfLines={3}
                style={{color: COLORS.white, ...FONTS.body6}}>
                {place.details}
              </Text>
              <TouchableOpacity>
                <Text style={{marginTop: 10, ...FONTS.h4, color: COLORS.white}}>
                  Click to read...
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

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
                paddingTop:
                  Platform.OS == 'ios' ? (SIZES.height > 812 ? 45 : 35) : 15,
                paddingBottom: 10,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <Image
                resizeMode="contain"
                style={{height: 35, width: 35, borderRadius: 35}}
                source={ICONS.PROFILE_MEMBER_ICON}
              />
              <TouchableOpacity>
                <Image
                  style={{
                    height: 35,
                    width: 35,
                    marginRight: 10,
                    tintColor: COLORS.white,
                  }}
                  source={ICONS.NOTIFICATION_ICON}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 110,
          }}>
          <LinearGradient
            colors={[COLORS.primary, '#396afc']}
            style={{flex: 1}}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            locations={[0, 0.7]}>
            <View style={{paddingHorizontal: 20}}>
              <Text style={style.headerTitle}>Explore your</Text>
              <Text style={style.headerTitle}>Classic Residency</Text>
            </View>
          </LinearGradient>
        </View>
        <ScrollView
          style={{backgroundColor: COLORS.white}}
          showsVerticalScrollIndicator={false}>
          <View style={{height: SIZES.height * 0.03}}></View>
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 35,
              ...FONTS.h2,
            }}>
            Services
          </Text>
          <ListCategories />
          <View>
            <Text style={style.sectionTitle}>Ads and offers</Text>
            <Banner data={places} />
            <Text style={style.sectionTitle}>Notice Board</Text>
            {list.map(item => (
              <View style={{paddingLeft: 20, paddingBottom: 20}}>
                <RecommendedCard place={item} />
              </View>
            ))}
          </View>
          <View style={{height: SIZES.height * 0.25}}></View>
          {/* </ScrollView> */}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
          marginTop: Platform.OS == 'ios' ? (SIZES.height > 812 ? 80 : 70) : 70,
        }}>
        <SearchBar
          value={input}
          placeholder="Search notice ..."
          onChangeText={text => setInput(text)}
          searchStyle={{top: 90}}
        />
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
    // fontWeight: 'bold',
    ...FONTS.h2,
    // fontSize: 23,
  },
  inputContainer: {
    zIndex: 1,
    // height: 50,
    padding: '5%',
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
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
export default HomeScreen;
