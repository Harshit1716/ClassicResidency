import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS} from '../resources';

const NoDataFound = () => {
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
      <Text style={{...FONTS.h2, color: COLORS.gray}}>NO DATA FOUND</Text>
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({});
