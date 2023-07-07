import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from './Header';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
import Icon, {Icons} from './Icons';
import {SHADOW_PRIMARY} from '../resources/Theme';
import AppTextInput from './AppTextInput';
import ProfileTextInput from './ProfileTextInput';

const MemberCategorories = () => {
  return (
    <View>
      <Header title="Members Categories" rightIconType="NONE" />
    </View>
  );
};

export default MemberCategorories;

const styles = StyleSheet.create({});
