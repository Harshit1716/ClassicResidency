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
            marginBottom: '35%',
            borderRadius: 10,
            paddingVertical: '5%',

            ...SHADOW,
          }}>
          <View style={{}}>
            <Text
              style={{
                ...FONTS.h2,
                width: '100%',
                color: COLORS.black,
                textAlign: 'center',
              }}>
              {data?.name}
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.black,
                textAlign: 'center',
              }}>
              Address : AOA
            </Text>
          </View>
          {/* </View> */}
          <Text
            style={{
              ...FONTS.h3,
              marginTop: 10,
              color: COLORS.black,
              textAlign: 'center',
            }}>
            {data.text}
          </Text>

          {data.imageUrl != '' && (
            <>
              <Image
                resizeMode="stretch"
                style={{
                  height: SIZES.height,
                  //   overflow: 'hidden',
                  marginBottom: 20,
                  width: '100%',
                  marginTop: '10%',
                  borderRadius: 10,
                  //   overflow: 'hidden',
                }}
                source={ICONS.MENU_ICON}
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
            Thanks for viewing this add , please visit us.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddDetail;

const styles = StyleSheet.create({});
