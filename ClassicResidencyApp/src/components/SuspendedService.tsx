import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS} from '../resources';

const SuspendedService = () => {
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
      <Text style={{...FONTS.h2, color: COLORS.gray, textAlign: 'center'}}>
        Chat service has been suspended for some important reason
      </Text>
    </View>
  );
};

export default SuspendedService;

const styles = StyleSheet.create({});
