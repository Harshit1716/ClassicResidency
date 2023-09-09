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
import ProfileTextInput from '../components/ProfileTextInput';
import {redirectToPhoneNumber} from '../resources/Utils';
const flatData = [];
interface DATATYPE {
  flatNumber: string;
  flatType: string;
  block: string;
  name: string;
  email: string;
  phoneNumber: string;
}
const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.userReducer.loading);
  async function handleCreateAccount() {
    // console.log(data.length);

    // data.forEach(async item => {
    await dispatch(
      createUser({
        flatNumber: '000',
        flatType: 'AOA',
        block: 'A',
        name: 'Shivam singh',
        email: 'thesocietease@gmail.com',
        phoneNumber: '9599104926',
      }),
    );
    // });
  }
  const [number, setNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [password, setPasssword] = useState('');
  const [block, setblock] = useState('');
  const [flatType, setflatType] = useState('');
  const [faltNo, setfaltNo] = useState('');
  useEffect(() => {
    // setNumber('9968212577');
    // setPasssword('7752128699');
    // let ar = '9599104926'.split('').reverse().join('');
    // setNumber('9599104926');
    // setPasssword('Shivamsingh455');
    // console.log(ar);
  }, []);
  const navigation = useNavigation();

  const validate = () => {
    const phoneNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    // !phoneNumberRegex.test(number)
    if (block.length == 0) {
      Alert.alert('Error', 'Please enter block');
      return false;
    }
    if (flatType.length == 0) {
      Alert.alert('Error', 'Please enter  flat type ');
      return false;
    }
    if (faltNo.length == 0) {
      Alert.alert('Error', 'Please enter flat number ');
      return false;
    }
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
                height: 200,
                width: 200,
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
            <View style={{width: '90%', alignSelf: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{width: SIZES.width * 0.3}}>
                  <ProfileTextInput
                    title={block}
                    disabled={false}
                    onChangeText={text => setblock(text)}
                    placeholder="BLock"
                  />
                </View>

                <View style={{width: SIZES.width * 0.3}}>
                  <ProfileTextInput
                    title={flatType}
                    disabled={false}
                    onChangeText={text => setflatType(text)}
                    placeholder="Flat Type"
                  />
                </View>
                <View style={{width: SIZES.width * 0.3}}>
                  <ProfileTextInput
                    title={faltNo}
                    disabled={false}
                    onChangeText={text => setfaltNo(text)}
                    placeholder="Flat No"
                  />
                </View>
              </View>
            </View>

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
                [
                  {
                    text: 'Cancel',
                  },
                  {
                    text: 'Connet',
                    onPress: () => {
                      redirectToPhoneNumber('9599104926');
                    },
                  },
                ],
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
                dispatch(
                  login({
                    phoneNumber: number,
                    password: password,
                    flatNo:
                      block.toUpperCase() +
                      flatType.toUpperCase() +
                      faltNo.toUpperCase(),
                  }),
                );
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
