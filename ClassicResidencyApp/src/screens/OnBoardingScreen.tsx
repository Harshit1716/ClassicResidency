import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {COLORS, FONTS, SIZES} from '../resources';
import MainView from '../components/MainView';

const {height} = Dimensions.get('window');

const OnBoardingScreen = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <MainView>
        <View
          style={{
            backgroundColor: COLORS.white,
            height: SIZES.height,
            width: SIZES.width,
          }}>
          <ImageBackground
            style={{
              height: height / 2.5,
            }}
            resizeMode="contain"
            source={require('../assets/electrician.jpg')}
          />
          <View
            style={{
              paddingHorizontal: SIZES.spacing * 4,
              paddingTop: SIZES.spacing * 4,
            }}>
            <Text
              style={{
                ...FONTS.h1,
                color: COLORS.primary,
                textAlign: 'center',
              }}>
              Discover Your Dream Job here
            </Text>

            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.black,
                textAlign: 'center',
                marginTop: SIZES.spacing * 2,
              }}>
              Explore all the existing job roles based or your interest and
              study major
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: SIZES.spacing * 2,
              paddingTop: SIZES.spacing * 6,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                backgroundColor: COLORS.primary,
                paddingVertical: SIZES.spacing * 1.5,
                paddingHorizontal: SIZES.spacing * 2,
                width: '48%',
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
                  ...FONTS.h2,
                  color: COLORS.white,
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => navigate('Register')}
              style={{
                paddingVertical: SIZES.spacing * 1.5,
                paddingHorizontal: SIZES.spacing * 2,
                width: '48%',
                borderRadius: SIZES.spacing,
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.black,
                  textAlign: 'center',
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </MainView>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({});
