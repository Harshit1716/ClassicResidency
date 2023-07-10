import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from './Header';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
// import Icon, {Icons} from './Icons';
import {SHADOW_PRIMARY} from '../resources/Theme';
import AppTextInput from './AppTextInput';
import ProfileTextInput from './ProfileTextInput';

const NoticeDetail = () => {
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{}}>
              <Text style={{...FONTS.h2}}>Notice Title</Text>
              <Text style={{...FONTS.body4}}>By : AOA</Text>
            </View>
            <Text style={{...FONTS.h4, marginTop: 5}}>12/10/23</Text>
          </View>
          <ImageBackground
            style={{
              height: 250,
              width: '100%',
              marginTop: '10%',
              borderRadius: 10,
              overflow: 'hidden',
            }}
            source={ICONS.BANNER_ICON2}>
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

          <Text
            style={[
              {
                width: '100%',
                alignSelf: 'center',
                ...FONTS.body3,
                marginVertical: SIZES.spacing,
              },
            ]}>
            Where does it come from? Contrary to popular belief, Lorem Ipsum is
            not simply random text. It has roots in a piece of classical Latin
            literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney College in Virginia,
            looked up one of the more obscure Latin words, consectetur, from a
            Lorem Ipsum passage, and going through the cites of the word in
            classical literature, discovered the undoubtable source. Lorem Ipsum
            comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
            Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
            BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
            dolor sit amet..", comes from a line in section 1.10.32. The
            standard chunk of Lorem Ipsum used since the 1500s is reproduced
            below for those interested. Sections 1.10.32 and 1.10.33 from "de
            Finibus Bonorum et Malorum" by Cicero are also reproduced in their
            exact original form, accompanied by English versions from the 1914
            translation by H. Rackham
          </Text>
          <Text style={{...FONTS.h3}}> Thanks !</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NoticeDetail;

const styles = StyleSheet.create({});
