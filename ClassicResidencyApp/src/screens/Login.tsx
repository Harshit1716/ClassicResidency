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

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.userReducer.loading);
  async function handleCreateAccount() {
    const data = [
      {
        flatNumber: '802',
        flatType: 'H2',
        block: 'B',
        name: 'ANIL KUMAR',
        email: 'anilyadav2209@gmail.com',
        phoneNumber: '9891811988',
        isAdmin: false,
        isAOA: true,
      },
      {
        flatNumber: '601',
        flatType: 'B1',
        block: 'G',
        name: 'OM CHAUHAN',
        email: '',
        phoneNumber: '9837373669',
        isAdmin: false,
        isAOA: true,
      },
      {
        flatNumber: '706',
        flatType: 'H1',
        block: 'I',
        name: 'ANURAG ANAND',
        email: 'aanurag754@gmail.com',
        phoneNumber: '9811442680',
        isAdmin: false,
        isAOA: true,
      },
      {
        flatNumber: '302',
        flatType: 'B1',
        block: 'H',
        name: 'MAHENDER SINGH',
        email: 'msingh01959@gmail.com',
        phoneNumber: '8057813640',
        isAdmin: false,
        isAOA: true,
      },
      {
        flatNumber: '1101',
        flatType: 'P1',
        block: 'B',
        name: 'MANOJ KUMAR',
        email: 'mkasana89@gmail.com',
        phoneNumber: '9871823143',
        isAdmin: false,
        isAOA: true,
      },
      {
        flatNumber: '001',
        flatType: 'H2',
        block: 'B',
        name: 'MANISH MEHROTRA',
        email: '',
        phoneNumber: '9312210860',
        isAdmin: false,
        isAOA: true,
      },
      {
        flatNumber: '1203',
        flatType: 'H3',
        block: 'G',
        name: 'VISHAL VERMA',
        email: '',
        phoneNumber: '9999236315',
        isAdmin: false,
        isAOA: true,
      },
      {
        flatNumber: '803',
        flatType: 'H3',
        block: 'H',
        name: 'VIKASH CHAUDHARY',
        email: '',
        phoneNumber: '9711264667',
        isAdmin: false,
        isAOA: true,
      },
      {
        flatNumber: '601',
        flatType: 'B2',
        block: 'J',
        name: 'MANOJ KUMAR SRIVASTAVAv',
        email: 'mks_dyna@hotmail.com',
        phoneNumber: '9910003156',
        isAdmin: false,
        isAOA: true,
      },
      {
        flatNumber: '402',
        flatType: 'B1',
        block: 'E',
        name: 'AJAY KR. JHA',
        email: 'ajayrealy@gmail.com',
        phoneNumber: '9990255776',
        isAdmin: false,
        isAOA: true,
      },
    ];
    data.forEach(async item => {
      console.log(item);
      await dispatch(createUser({...item}));
    });
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
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
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
