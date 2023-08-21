import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS} from '../resources';

const UpdateRequired = () => {
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
        Newer Version is available please update the app to use it.
      </Text>
    </View>
  );
};

export default UpdateRequired;

const styles = StyleSheet.create({});
