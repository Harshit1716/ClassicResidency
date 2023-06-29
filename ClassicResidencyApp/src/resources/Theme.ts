import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // primary: '#285995', // Blue
  blue: '#1F41BB',
  primary: '#1F41BB', // Dark purple
  lightPrimary: '#f1f4ff',
  secondary: '#ea580c', // Dark purple
  dark: '#626262',
  darkText: '#000000',
  white: '#fff',
  black: '#000000',
  green: '#37E39F',
  red: '#F9A8BA',
  gray: '#6A6A6A',
  lightGray: '#dbdbdb',
  lightGray1: '#f5f6fa',
  lightBlue: '#f1f4ff',
};

export const BADGECOLORS = {
  danger: 'danger',
  error: 'error',
  success: 'success',
  muted: 'muted',
  primary: 'primary',
  info: 'info',
  secondary: 'secondary',
  light: 'light',
  tertiary: 'tertiary',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  spacing: 10,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
  isSmallDevice: width < 375,
};
export const FONTS = {
  h1: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 18},
  h5: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 16},
  h6: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 14},
  body1: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body4, lineHeight: 22},
  body5: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body5, lineHeight: 18},
  body6: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body5, lineHeight: 16},
  body7: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body5, lineHeight: 14},
  body8: {fontFamily: 'Poppins-Regular', fontSize: SIZES.body5, lineHeight: 12},
};
export const SHADOW = {
  shadowColor: COLORS.lightGray,
  shadowOffset: {width: 0, height: 5},
  shadowOpacity: 0.3,
  shadowRadius: 2,
  borderColor: COLORS.lightGray,
  elevation: 10,
};

export const SHADOW_PRIMARY = {
  shadowColor: COLORS.primary,
  shadowOffset: {
    width: 0,
    height: SIZES.spacing,
  },
  shadowOpacity: 0.3,
  shadowRadius: SIZES.spacing,
  elevation: 20,
};

const appTheme = {COLORS, SIZES, FONTS, SHADOW};

export default appTheme;
