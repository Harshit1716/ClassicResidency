import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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
import CreateComplaintsModal from '../components/CreateComplaintsModal';
import AddProfileModal from '../components/AddProfileModal';
import AddNewProfile from '../components/AddNewProfile';
import {useNavigation} from '@react-navigation/native';
import Loader from '../components/Loader';
const flatData = [];
interface DATATYPE {
  flatNumber: string;
  flatType: string;
  block: string;
  name: string;
  email: string;
  phoneNumber: string;
  isAdmin: boolean;
  isAOA: boolean;
}
const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.userReducer.loading);
  async function handleCreateAccount() {
    // const data: DATATYPE[] = []
    // console.log(data.length);
    // data.forEach(async item => {
    //   await dispatch(createUser(item));
    // });
    await dispatch(
      createUser({
        flatNumber: '000',
        flatType: 'H1',
        block: 'Z',
        name: 'technopians',
        email: 'technopians@yopmail.com',
        phoneNumber: '9355209292',
        isAdmin: true,
        isAOA: true,
      }),
    );
  }
  const [number, setNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [password, setPasssword] = useState('');
  useEffect(() => {
    // setNumber('9355209292');
    // setPasssword('Atmaram@321');
    // setNumber('9355209292');
    // setPasssword('Harry');
  }, []);
  const navigation = useNavigation();

  const validate = () => {
    const phoneNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    // !phoneNumberRegex.test(number)
    if (number.length == 0) {
      Alert.alert('Error', 'Please enter a number ');
      return false;
    }
    if (!phoneNumberRegex.test(number)) {
      Alert.alert('Error', 'Please enter a valid number ');
      return false;
    }
    if (password.length == 0) {
      Alert.alert('Error', 'Please enter a password  ');
      return false;
    }

    return true;
  };

  return (
    <View
      style={{
        flex: 1,
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: COLORS.white,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingTop:
              Platform.OS == 'android'
                ? SIZES.height > 640
                  ? '3%'
                  : '5%'
                : SIZES.height >= 812
                ? '20%'
                : '5%',
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
              style={{
                height: 270,
                width: 270,
                marginTop: SIZES.spacing,
                marginLeft: '5%',
              }}
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

          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Alert',
                'Please connect with AOA to reset your password',
              );
            }}>
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
              if (validate()) {
                dispatch(login({phoneNumber: number, password: password}));
              }
            }}
            disabled={isLoading}
          />
          <TouchableOpacity
            onPress={() => {
              handleCreateAccount();
              // navigation.navigate('NewUserScreen');
            }}
            style={{
              padding: SIZES.spacing,
              // marginVertical: 100,
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
        {open && (
          <AddNewProfile isVisible={open} onClose={() => setOpen(false)} />
        )}
      </ScrollView>
      {isLoading && <Loader />}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
