import React from 'react';
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
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import {ICONS, COLORS, SIZES} from '../resources';
import MainView from '../components/MainView';
import {SHADOW_PRIMARY} from '../resources/Theme';
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
  const categoryIcons = [
    <Image style={{height: 30, width: 30}} source={ICONS.MEMBERS_ICON} />,
    <Image style={{height: 30, width: 30}} source={ICONS.MEMBERS_ICON} />,
    <Image style={{height: 30, width: 30}} source={ICONS.MEMBERS_ICON} />,
    <Image style={{height: 30, width: 30}} source={ICONS.MEMBERS_ICON} />,
  ];

  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryIcons.map((icon, index) => (
          <View key={index} style={style.iconContainer}>
            {icon}
          </View>
        ))}
      </View>
    );
  };

  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', place)}>
        <ImageBackground style={style.cardImage} source={place.image}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {place.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{height: 30, width: 30}}
                source={ICONS.MEMBERS_ICON}
              />
              <Text style={{marginLeft: 5, color: COLORS.white}}>
                {place.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{height: 30, width: 30}}
                source={ICONS.MEMBERS_ICON}
              />
              <Text style={{marginLeft: 5, color: COLORS.white}}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({place}) => {
    return (
      <ImageBackground style={style.rmCardImage} source={place.image}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: 'bold',
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
          <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{height: 30, width: 30}}
                source={ICONS.MEMBERS_ICON}
              />

              <Text style={{color: COLORS.white, marginLeft: 5}}>
                {place.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{height: 30, width: 30}}
                source={ICONS.MEMBERS_ICON}
              />
              <Text style={{color: COLORS.white, marginLeft: 5}}>5.0</Text>
            </View>
          </View>
          <Text style={{color: COLORS.white, fontSize: 13}}>
            {place.details}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    // <MainView>
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={style.header}>
        <Image
          style={{height: 50, width: 50, tintColor: COLORS.white}}
          source={ICONS.ACCOUNT_TAB_ICON}
        />
        <Image
          style={{height: 30, width: 30}}
          source={ICONS.NOTIFICATION_ICON}
        />
      </View>

      <ScrollView
        style={{backgroundColor: COLORS.white}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: COLORS.primary,
            height: 120,
            paddingHorizontal: 20,
          }}>
          <Text style={style.headerTitle}>Explore the</Text>
          <Text style={style.headerTitle}>beautiful places</Text>
          <View style={{flex: 1}}>
            <View style={style.inputContainer}>
              <Image
                style={{height: 30, width: 30, marginRight: 10}}
                source={ICONS.SEARCH_ICON}
              />
              <TextInput
                placeholder="Search place"
                style={{color: COLORS.gray}}
              />
            </View>
          </View>
        </View>
        <View style={{height: SIZES.height * 0.03}}></View>
        {/* <ScrollView
          style={{paddingTop: 0, flex: 1, zIndex: 0, height: SIZES.height}}> */}
        <ListCategories />
        <Text style={style.sectionTitle}>Places</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({item}) => <Card place={item} />}
          />
          <Text style={style.sectionTitle}>Recommended</Text>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={places}
            renderItem={({item}) => <RecommendedCard place={item} />}
          />
        </View>
        <View style={{height: SIZES.height * 0.45}}></View>
        {/* </ScrollView> */}
      </ScrollView>
    </View>
    // </MainView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingTop: '15%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 23,
  },
  inputContainer: {
    zIndex: 1,
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    // position: 'absolute',
    marginTop: '-15%',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    // elevation: 12,
    ...SHADOW_PRIMARY,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...SHADOW_PRIMARY,
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
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
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
});
export default HomeScreen;
