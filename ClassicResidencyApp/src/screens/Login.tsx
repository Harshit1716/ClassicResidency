import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import AppTextInput from '../components/AppTextInput';
import {COLORS, FONTS, ICONS, SIZES} from '../resources';
import MainView from '../components/MainView';
import AppButton from '../components/AppButton';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {createUser, login} from '../stateManagemer/slice/ServiceSlice';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.userReducer.loading);
  async function handleCreateAccount() {
    const data = {
      flatNumber: '702',
      flatType: 'H1',
      block: 'I',
      name: 'Harshit Tyagi',
      email: 'harshit@yopmail.com',
      phoneNumber: '9355209292',
    };
    dispatch(createUser({...data}));
  }
  const [number, setNumber] = useState('');
  const [password, setPasssword] = useState('');
  useEffect(() => {
    setNumber('9355209292');
    setPasssword('Harry');
  });
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
              ? '20%'
              : '5%',
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
          <AppTextInput
            editable={!isLoading}
            placeholder="number"
            value={number}
            onChangeText={(text: string) => {
              setNumber(text);
            }}
          />
          <AppTextInput
            editable={!isLoading}
            placeholder="Password"
            value={password}
            onChangeText={(text: string) => {
              setPasssword(text);
            }}
          />
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
        <AppButton
          title="Login"
          onPress={() => {
            dispatch(login({phoneNumber: number, password: password}));
          }}
          disabled={isLoading}
        />
        <TouchableOpacity
          // onPress={() => handleCreateAccount()}
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
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
