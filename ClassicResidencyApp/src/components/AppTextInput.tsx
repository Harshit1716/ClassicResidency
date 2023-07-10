import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';

import {COLORS, FONTS, ICONS, SIZES} from '../resources';
import {SHADOW_PRIMARY} from '../resources/Theme';
import {Image} from 'react-native-animatable';

interface InputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  editable: boolean;
}

const AppTextInput = (props: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      keyboardType="number-pad"
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={COLORS.gray}
      style={[
        {
          width: '90%',
          alignSelf: 'center',
          ...FONTS.body3,
          padding: SIZES.spacing * 1.2,
          backgroundColor: COLORS.lightPrimary,
          borderRadius: SIZES.spacing,
          marginVertical: SIZES.spacing,
          height: 50,
        },
        focused && {
          borderWidth: 3,
          borderColor: COLORS.primary,
          ...SHADOW_PRIMARY,
        },
      ]}></TextInput>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
