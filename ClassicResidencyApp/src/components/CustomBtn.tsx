import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../resources';
import {SHADOW, SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';
import {useNavigation} from '@react-navigation/native';

interface AppBtnProps {
  title: string;
  onPress: () => void;
  shadow: 'LIGHT' | 'PRIMARY' | 'DEFAULT' | 'NONE';
  disabled: boolean;
  color: string;
  width?: DimensionValue;
}
const CustomBtn = (props: AppBtnProps) => {
  const navigation = useNavigation();
  function getShadow() {
    switch (props.shadow) {
      case 'LIGHT':
        return SHADOW_PRIMARY_LIGHT;
      case 'PRIMARY':
        return SHADOW_PRIMARY;
      case 'DEFAULT':
        return SHADOW;
      case 'NONE':
        return {};
    }

    return SHADOW_PRIMARY_LIGHT;
  }
  return (
    <View style={{paddingVertical: 10}}>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPress}
        style={[
          {
            width: props.width ? props.width : '90%',
            alignSelf: 'center',
            padding: SIZES.spacing * 1.4,
            backgroundColor: props.color,
            marginVertical: SIZES.spacing,
            borderRadius: SIZES.spacing,
          },
          {...getShadow()},
        ]}>
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

export default CustomBtn;

const styles = StyleSheet.create({});
