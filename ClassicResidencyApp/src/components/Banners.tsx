import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import {COLORS, ICONS, SIZES} from '../resources';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {getAllAds} from '../stateManagemer/slice/ServiceSlice';
import {Ads} from '../stateManagemer/models/SocietyAppModal';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

const Banner = ({data}: any) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, SIZES.width);
  const [dataList, setDataList] = useState(data);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const ads = useAppSelector(item => item.userReducer.bannerList);
  const flatListRef = useRef(null);
  useEffect(() => {
    dispatch(getAllAds());
  }, []);

  const Card = ({item, index}: {item: Ads; index: number}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddDetail', {data: item})}>
        <ImageBackground
          resizeMode="stretch"
          style={{
            height: SIZES.height * 0.25,
            width: SIZES.width - SIZES.width * 0.1,
            marginRight: 20,
            marginLeft: 20,
            padding: 10,
            overflow: 'hidden',
            borderRadius: 10,
          }}
          source={{uri: item.banner + ''}}>
          {/* <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {item.name}
          </Text> */}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

  return (
    <View>
      <Carousel
        autoplay={true}
        loop={ads.length > 1 ? true : false}
        data={ads}
        renderItem={Card}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    </View>
  );
};

export default Banner;
