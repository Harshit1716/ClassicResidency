import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';

import {COLORS, FONTS, SIZES} from '../resources';

const AppTextInput: React.FC<TextInputProps> = ({...otherProps}) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={COLORS.darkText}
      style={[
        {
          ...FONTS.body3,
          padding: SIZES.spacing * 2,
          backgroundColor: COLORS.lightPrimary,
          borderRadius: SIZES.spacing,
          marginVertical: SIZES.spacing,
        },
        focused && {
          borderWidth: 3,
          borderColor: COLORS.primary,
          shadowOffset: {width: 4, height: SIZES.spacing},
          shadowColor: COLORS.primary,
          shadowOpacity: 0.2,
          shadowRadius: SIZES.spacing,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
