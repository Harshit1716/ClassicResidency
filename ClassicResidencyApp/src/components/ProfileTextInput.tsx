import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';

import {COLORS, FONTS, SIZES} from '../resources';
import {SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';

interface InputProps {
  title: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  disabled: boolean;
  textArea?: boolean;
  keybordType?: string;
}

const ProfileTextInput = (props: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      multiline={props.textArea ?? false}
      editable={!props.disabled}
      value={props.title}
      placeholder={props.placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChangeText={props.onChangeText}
      keyboardType={props.keybordType == 'phone' ? 'phone-pad' : 'default'}
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
        },
        focused && {
          borderStyle: 'dotted',
          borderWidth: 1,
          borderColor: COLORS.primary,
          ...SHADOW_PRIMARY_LIGHT,
        },
        props.textArea && {
          height: SIZES.height * 0.16,
        },
      ]}
    />
  );
};

export default ProfileTextInput;

const styles = StyleSheet.create({});
