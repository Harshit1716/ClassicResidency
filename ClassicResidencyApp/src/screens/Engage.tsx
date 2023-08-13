import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MainView from '../components/MainView';
import Header from '../components/Header';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';

const Engage = () => {
  const [postScreen, setPostScreen] = useState(false);
  const selectorBtn = () => {
    return (
      <View
        style={{
          marginTop: 20,
          borderRadius: 10,
          height: SIZES.height * 0.05,
          width: '90%',
          backgroundColor: COLORS.white,
          alignSelf: 'center',
          flexDirection: 'row',
          marginBottom: 20,
          ...SHADOW,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (postScreen) setPostScreen(false);
          }}
          style={{
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            height: SIZES.height * 0.05,
            // width: '80%',
            flex: 1,
            backgroundColor: postScreen ? COLORS.white : COLORS.primary,
            alignSelf: 'center',
            ...SHADOW,
          }}>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.h3,
              color: !postScreen ? COLORS.white : COLORS.primary,
            }}>
            Ads
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!postScreen) setPostScreen(true);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            height: SIZES.height * 0.05,
            backgroundColor: !postScreen ? COLORS.white : COLORS.primary,
            alignSelf: 'center',
            flex: 1,
            ...SHADOW,
          }}>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.h3,
              color: postScreen ? COLORS.white : COLORS.primary,
            }}>
            Posts
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderPostScreen = () => {
    return <View style={{}}></View>;
  };
  return (
    <MainView>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <Header hideBackIcon={true} title={'Engage'} rightIconType="NONE" />
      {selectorBtn()}
      {renderPostScreen()}
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightPrimary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{height: '50%', width: '100%', marginTop: '-20%'}}
          source={ICONS.COMMING_SOON_ICON}
        />
      </View>
    </MainView>
  );
};

export default Engage;

const styles = StyleSheet.create({});
