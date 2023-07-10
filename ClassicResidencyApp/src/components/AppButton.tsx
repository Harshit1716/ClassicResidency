import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../resources';
import {SHADOW_PRIMARY} from '../resources/Theme';
import {useNavigation} from '@react-navigation/native';

interface AppBtnProps {
  title: string;
  onPress: () => void;
  disabled: boolean;
}
const AppButton = (props: AppBtnProps) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPress}
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
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({});
