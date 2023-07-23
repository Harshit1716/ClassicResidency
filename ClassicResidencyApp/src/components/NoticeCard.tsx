import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';
import {Notice} from '../stateManagemer/models/SocietyAppModal';

const NoticeCard = ({item, index}: {item: Notice; index: number}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('NoticeDetail', {data: item});
      }}
      style={{
        alignSelf: 'center',
        marginBottom: 20,
        width: SIZES.width - 30,
        borderRadius: 20,
        overflow: 'hidden',
      }}>
      <LinearGradient
        colors={['#606c88', '#3f4c6b']}
        style={{flex: 1}}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        locations={[0, 0.7]}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: '5%',
            paddingVertical: '2%',
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              marginTop: 10,
            }}>
            {item.title}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 5,
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
                  ...FONTS.body4,
                  marginLeft: 10,
                  marginTop: 5,
                }}>
                {item.subject}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={{color: COLORS.white, ...FONTS.body6}}>
              {item.description}
            </Text>
            {/* <TouchableOpacity style={{alignSelf: 'flex-end'}}> */}
            <Text
              style={{
                marginTop: 10,
                ...FONTS.body4,
                color: COLORS.white,
                alignSelf: 'flex-end',
              }}>
              Read more..
            </Text>
            {/* </TouchableOpacity> */}
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default NoticeCard;

const styles = StyleSheet.create({});
