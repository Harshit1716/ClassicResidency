import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';

const NoticeCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('NoticeDetail');
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
            padding: 15,
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              marginTop: 10,
            }}>
            Notice title
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
                dasdasda
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={{color: COLORS.white, ...FONTS.body6}}>
              asdasdasd;knas;kvnadf;kjvasmdokasmdoasdmaosdmakmsaoskcmaoscnaos
              dfa;kvaksmdoasdmasodmaosdnaodmoaskdmaoskdmaosdmaoskdmaskdmaosdkmaosdmoaskdmaskdmaom
              kfjav;dasdkmaosdmasodfkmasdofmasodfmdaosfmaosmdoaskmdoasmdkvjn;kfnvas;kdcasdcl;ksadm
            </Text>
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
              <Text
                style={{marginTop: 10, ...FONTS.body4, color: COLORS.white}}>
                Click to read...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NoticeCard;

const styles = StyleSheet.create({});
