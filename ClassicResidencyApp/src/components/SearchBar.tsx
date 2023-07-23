import {Image, StyleSheet, Text, TextInput, View, Platform} from 'react-native';
import React from 'react';
import {COLORS, ICONS} from '../resources';
import {SHADOW, SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';

interface SearchProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  searchStyle: any;
  value: string;
  shadow: 'LIGHT' | 'PRIMARY' | 'DEFAULT' | 'NONE';
}

const SearchBar = (props: SearchProps) => {
  function getShadow() {
    switch (props.shadow) {
      case 'LIGHT':
        return SHADOW_PRIMARY_LIGHT;
      case 'PRIMARY':
        return SHADOW_PRIMARY;
      case 'NONE':
        return {};
    }

    return SHADOW_PRIMARY_LIGHT;
  }
  return (
    <View
      style={[
        styles.inputContainer,
        {...props.searchStyle, ...getShadow()},
        Platform.OS == 'android' && {paddingVertical: 0, height: 60},
      ]}>
      <Image
        style={{height: 25, width: 25, marginRight: 10}}
        source={ICONS.SEARCH_ICON}
      />
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={{color: COLORS.black, width: '100%'}}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    zIndex: 1,
    // height: 50,
    padding: '5%',
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
