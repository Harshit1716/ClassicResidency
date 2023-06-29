import {
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
import {COLORS, FONTS, SIZES} from '../resources';

const LoginScreen = () => {
  return (
    <SafeAreaView>
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
          <Text
            style={{
              ...FONTS.h1,
              color: COLORS.primary,
              marginVertical: SIZES.spacing * 3,
            }}>
            Login here
          </Text>

          <Text
            style={{
              ...FONTS.h3,
              maxWidth: '60%',
              textAlign: 'center',
            }}>
            Welcome back !
          </Text>
          <Text
            style={{
              ...FONTS.h3,
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

        <TouchableOpacity
          style={{
            padding: SIZES.spacing * 2,
            backgroundColor: COLORS.primary,
            marginVertical: SIZES.spacing * 3,
            borderRadius: SIZES.spacing,
            shadowColor: COLORS.primary,
            shadowOffset: {
              width: 0,
              height: SIZES.spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: SIZES.spacing,
          }}>
          <Text
            style={{
              color: COLORS.white,
              textAlign: 'center',
              ...FONTS.h3,
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
