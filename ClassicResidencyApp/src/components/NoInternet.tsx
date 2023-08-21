import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS} from '../resources';

const NoInterNet = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        resizeMode="contain"
        style={{
          height: '30%',
          width: '30%',
          marginTop: '30%',
          // marginBottom: '-10%',
        }}
        source={ICONS.NO_DATA_ICON}
      />
      <Text style={{...FONTS.h2, color: COLORS.gray}}>
        NO Internet Connection Found
      </Text>
    </View>
  );
};

export default NoInterNet;

const styles = StyleSheet.create({});
