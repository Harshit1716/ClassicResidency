import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';

import {Notice} from '../stateManagemer/models/SocietyAppModal';
import Header from '../components/Header';
import {SHADOW_PRIMARY} from '../resources/Theme';
import {redirectToPhoneNumber} from '../resources/Utils';

const AddDetail = ({route}: any) => {
  const [data, setData] = useState<any>(route?.params?.data);

  return (
    <View>
      <Header title={route?.params?.data?.name ?? ''} rightIconType="NONE" />
      <ScrollView>
        <View
          style={{
            width: '95%',
            // height: SIZES.height * 1.4,

            backgroundColor: COLORS.white,
            alignSelf: 'center',
            marginTop: '5%',
            marginBottom: '50%',
            borderRadius: 10,
            paddingVertical: '5%',

            ...SHADOW,
          }}>
          <View style={{}}>
            <Text
              style={{
                ...FONTS.h1,
                width: '100%',
                color: COLORS.primary,
                textAlign: 'center',
              }}>
              {data?.name}
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.black,
                textAlign: 'center',
              }}>
              Address :{data?.address}
            </Text>
            <Text
              style={{
                ...FONTS.h3,

                color: COLORS.black,
                textAlign: 'center',
              }}>
              Contact No :- {data?.number}
            </Text>
          </View>
          {/* </View> */}
          <Text
            style={{
              ...FONTS.body3,
              marginTop: 20,
              color: COLORS.black,
              // textAlign: 'center',
              marginHorizontal: 10,
              width: '90%',
            }}>
            {data.text1}
          </Text>

          {data.img1 != '' && (
            <>
              <Image
                resizeMode="stretch"
                style={{
                  height: SIZES.height * 0.5,

                  marginBottom: 20,
                  width: '100%',
                  marginTop: '10%',
                  borderRadius: 10,
                  //   overflow: 'hidden',
                }}
                source={{uri: data.img1 + ''}}
              />
            </>
          )}
          {data?.img2 != '' && (
            <>
              <Image
                resizeMode="stretch"
                style={{
                  height: SIZES.height * 0.4,
                  marginBottom: 20,
                  width: '100%',
                  marginTop: '10%',
                  borderRadius: 10,
                  //   overflow: 'hidden',
                }}
                source={{uri: data?.img2 + ''}}
              />
            </>
          )}

          <Text
            style={[
              {
                width: '100%',
                alignSelf: 'center',
                color: COLORS.black,
                textAlign: 'center',
                ...FONTS.body3,
                marginVertical: SIZES.spacing,
              },
            ]}>
            {data?.text2}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => redirectToPhoneNumber(data?.number)}
        style={{
          position: 'absolute',
          padding: '5%',
          width: '90%',
          alignSelf: 'center',
          backgroundColor: COLORS.primary,
          borderRadius: 10,
          ...SHADOW_PRIMARY,
          bottom: SIZES.height * 0.15,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
            flex: 1,
          }}>
          Dial {data.number}
        </Text>
        <Image style={{height: 30, width: 30}} source={ICONS.CALL_ICON} />
      </TouchableOpacity>
    </View>
  );
};

export default AddDetail;

const styles = StyleSheet.create({});
