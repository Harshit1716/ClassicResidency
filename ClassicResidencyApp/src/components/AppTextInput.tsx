import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';

import {COLORS, FONTS, SIZES} from '../resources';
import {SHADOW_PRIMARY} from '../resources/Theme';

const AppTextInput: React.FC<TextInputProps> = ({...otherProps}) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={COLORS.darkText}
      style={[
        {
          width: '90%',
          alignSelf: 'center',
          ...FONTS.body3,
          padding: SIZES.spacing * 1.2,
          backgroundColor: COLORS.lightPrimary,
          borderRadius: SIZES.spacing,
          marginVertical: SIZES.spacing,
        },
        focused && {
          borderWidth: 3,
          borderColor: COLORS.primary,
          ...SHADOW_PRIMARY,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
