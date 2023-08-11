import React, {useState, useEffect} from 'react';
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

const Banner = ({data}) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, SIZES.width);
  const [dataList, setDataList] = useState(data);

  useEffect(() => {
    setDataList(data);
  });

  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() => navigation.navigate('DetailsScreen', place)}>
      >
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
          source={place.image}>
          {/* <Text
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
              <Text style={{marginLeft: 5, color: COLORS.white}}>
                {place.location}
              </Text>
            </View>
          </View> */}
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'key' + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <Card place={item} />;
          }}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: scrollX}}},
          ])}
        />
        <View style={styles.dotView}>
          {data.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: '#595959',
                  margin: 8,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  dotView: {flexDirection: 'row', justifyContent: 'center'},
});

export default Banner;
