import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../resources';

const Loader = () => {
  return (
    <View
      style={{
        height: SIZES.height,
        width: SIZES.width,
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      }}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
