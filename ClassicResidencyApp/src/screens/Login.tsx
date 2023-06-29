import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import AppTextInput from '../components/AppTextInput';
import {COLORS, FONTS, ICONS, SIZES} from '../resources';
import MainView from '../components/MainView';
import AppButton from '../components/AppButton';

const LoginScreen = () => {
  return (
    // <SafeAreaView>
    <MainView>
      <View
        style={{
          height: SIZES.height,
          width: SIZES.width,
          backgroundColor: 'white',
          padding: SIZES.spacing * 2,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{height: 100, width: 100, marginTop: SIZES.spacing}}
            source={ICONS.LOGO_ICON}
          />
          <Text
            style={{
              ...FONTS.h1,
              color: COLORS.primary,
              marginVertical: SIZES.spacing * 3,
            }}>
            Login
          </Text>

          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.black,
              maxWidth: '60%',
              textAlign: 'center',
            }}>
            Welcome back !
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.black,
              maxWidth: '60%',
              textAlign: 'center',
            }}>
            you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: SIZES.spacing * 3,
          }}>
          <AppTextInput placeholder="Email" />
          <AppTextInput placeholder="Password" />
        </View>

        <TouchableOpacity>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.primary,
              alignSelf: 'flex-end',
            }}>
            Forgot your password ?
          </Text>
        </TouchableOpacity>
        <AppButton />
        <TouchableOpacity
          // onPress={() => navigate('Register')}
          style={{
            padding: SIZES.spacing,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              textAlign: 'center',
            }}>
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </MainView>
    // </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
