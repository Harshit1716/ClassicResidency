import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainView from '../components/MainView';
import Header from '../components/Header';
import {COLORS, ICONS, SIZES} from '../resources';
import {Image} from 'react-native-animatable';

const Passes = () => {
  return (
    <MainView>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <Header hideBackIcon={true} title={'Passes'} rightIconType="NONE" />

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.lightPrimary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{height: '100%', width: '100%', top: '-10%'}}
          source={ICONS.COMMING_SOON_ICON}
        />
      </View>
    </MainView>
  );
};

export default Passes;

const styles = StyleSheet.create({});
