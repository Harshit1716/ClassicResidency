import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainView from '../components/MainView';
import Header from '../components/Header';
import {COLORS, ICONS, SIZES} from '../resources';
import {Image} from 'react-native-animatable';

const SOP = () => {
  return (
    <MainView>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <Header hideBackIcon={true} title={'SOP'} rightIconType="NONE" />

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightPrimary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{
            height: '100%',
            width: '80%',
            top: '-10%',
            alignSelf: 'center',
          }}
          source={ICONS.COMMING_SOON_ICON}
        />
      </View>
    </MainView>
  );
};

export default SOP;

const styles = StyleSheet.create({});
