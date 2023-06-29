import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../resources';
import {SHADOW_PRIMARY} from '../resources/Theme';
import {useNavigation} from '@react-navigation/native';

const AppButton = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{
          width: '90%',
          alignSelf: 'center',
          padding: SIZES.spacing * 1.2,
          backgroundColor: COLORS.primary,
          marginVertical: SIZES.spacing * 3,
          borderRadius: SIZES.spacing,
          ...SHADOW_PRIMARY,
        }}>
        <Text
          style={{
            color: COLORS.white,
            textAlign: 'center',
            ...FONTS.h3,
          }}>
          Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({});
