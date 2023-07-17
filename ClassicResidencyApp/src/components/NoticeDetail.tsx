import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from './Header';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
// import Icon, {Icons} from './Icons';
import {SHADOW_PRIMARY} from '../resources/Theme';
import AppTextInput from './AppTextInput';
import ProfileTextInput from './ProfileTextInput';
import {Notice} from '../stateManagemer/models/SocietyAppModal';

const NoticeDetail = ({route}: any) => {
  const [data, setData] = useState<Notice>(route?.params?.data);

  return (
    <View>
      <Header title="Notice Detail" rightIconType="NONE" />
      <ScrollView>
        <View
          style={{
            width: '95%',
            // height: SIZES.height * 1.4,
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            marginTop: '5%',
            marginBottom: '35%',
            borderRadius: 10,
            padding: '5%',
            ...SHADOW,
          }}>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> */}
          <View style={{}}>
            <Text style={{...FONTS.h2, width: '100%'}}>{data.title}</Text>
            <Text style={{...FONTS.body4}}>By : AOA</Text>
          </View>
          {/* </View> */}
          <Text style={{...FONTS.h4, marginTop: 5}}>
            Date : {data.createdAt}
          </Text>
          {data.imageUrl != '' && (
            <ImageBackground
              resizeMode="stretch"
              style={{
                // height: 350,
                // height: '100%',
                marginBottom: 20,
                aspectRatio: 1 / 1,
                width: '100%',
                marginTop: '10%',
                borderRadius: 10,
                overflow: 'hidden',
              }}
              source={{uri: data.imageUrl + ''}}>
              {/* <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                marginRight: -10,
                backgroundColor: COLORS.lightPrimary,
                ...SHADOW_PRIMARY,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: -20,
                alignSelf: 'flex-end',
              }}
              onPress={() => {}}>
              <Icon
                type={Icons.FontAwesome}
                name={'download'}
                color={COLORS.primary}
              />
            </TouchableOpacity> */}
            </ImageBackground>
          )}
          <Text style={{...FONTS.h3, marginTop: 10}}>
            Subject : {data.subject}
          </Text>
          <Text
            style={[
              {
                width: '100%',
                alignSelf: 'center',
                ...FONTS.body3,
                marginVertical: SIZES.spacing,
              },
            ]}>
            {data.description}
          </Text>
          {/* <Text style={{...FONTS.h3}}> Thanks !</Text> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default NoticeDetail;

const styles = StyleSheet.create({});
