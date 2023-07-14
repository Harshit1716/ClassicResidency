import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {COLORS, FONTS, SIZES} from '../resources';
import MainView from '../components/MainView';
import {SHADOW_PRIMARY} from '../resources/Theme';
import {getData, userDataSKeys} from '../resources/Utils';
import {useAppDispatch} from '../stateManagemer/Store';
import {loginUser} from '../stateManagemer/slice/ServiceSlice';

const {height} = Dimensions.get('window');

const OnBoardingScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const checkUserExists = async () => {
    const user = await getData(userDataSKeys);
    if (user != null) {
      dispatch(loginUser(user));
    }
  };
  useEffect(() => {
    checkUserExists();
  }, []);

  return (
    <MainView>
      <View
        style={{
          paddingTop:
            Platform.OS == 'android'
              ? SIZES.height > 640
                ? '15%'
                : '5%'
              : SIZES.height >= 812
              ? '25%'
              : '10%',
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
              fontFamily: 'Poppins-Bold',

              color: COLORS.primary,
              textAlign: 'center',
            }}>
            Welcom To The
          </Text>
          <Text
            style={{
              ...FONTS.h1,
              fontFamily: 'Poppins-Bold',
              color: COLORS.primary,
              textAlign: 'center',
            }}>
            Classic Residency
          </Text>

          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              textAlign: 'center',
              marginTop: SIZES.spacing * 2,
            }}>
            Explore all the existing job roles based or your interest and study
            major
          </Text>
        </View>
        <View
          style={{
            // paddingHorizontal: SIZES.spacing * 2,
            alignSelf: 'center',
            paddingTop: SIZES.spacing * 6,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: SIZES.spacing * 1,
              // paddingHorizontal: SIZES.spacing * 2,
              width: '90%',
              alignSelf: 'center',
              borderRadius: SIZES.spacing,
              ...SHADOW_PRIMARY,
            }}>
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.white,
                textAlign: 'center',
              }}>
              Start
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{
              paddingVertical: SIZES.spacing * 1,
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
          </TouchableOpacity> */}
        </View>
      </View>
    </MainView>
    // </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({});
