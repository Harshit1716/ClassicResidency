import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, ICONS, SIZES} from '../resources';
import ProfileTextInput from '../components/ProfileTextInput';

import {SHADOW} from '../resources/Theme';

import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {createUser} from '../stateManagemer/slice/ServiceSlice';

import CheckBox from '@react-native-community/checkbox';
import Header from '../components/Header';
import MainView from '../components/MainView';

const NewUserScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [AOA, setAOA] = useState(false);
  const [block, setblock] = useState('');
  const [flatType, setflatType] = useState('');
  const [faltNo, setfaltNo] = useState('');

  const dispatch = useAppDispatch();

  const header = () => {
    return (
      <View style={{}}>
        <View style={styles.headerContainer}>
          <View style={{marginRight: -40, ...styles.headingContainer}}>
            <Text style={styles.headerTitle}>Create Profile</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.white,
              ...SHADOW,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: -50,
            }}>
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
              }}
              source={ICONS.CLOSE_ICON}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.separatorLine} />
      </View>
    );
  };

  async function handleCreateAccount() {
    const data = {
      flatNumber: faltNo,
      flatType: flatType,
      block: block,
      name: name,
      email: email,
      phoneNumber: phoneNo,
      isAOA: AOA,
      isAdmin: false,
    };
    await dispatch(createUser({...data}));
  }

  async function handleSubmit() {
    if (validate()) {
      await handleCreateAccount();
    }
  }

  const SubmitButton = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buyButton}>
          <Text style={styles.buyText}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

    if (block.length == 0) {
      Alert.alert('Error', 'Please enter block ');
      return false;
    }
    if (flatType.length == 0) {
      Alert.alert('Error', 'Please enter flat type ');
      return false;
    }
    if (faltNo.length == 0) {
      Alert.alert('Error', 'Please enter flat no ');
      return false;
    }
    if (name.length == 0) {
      Alert.alert('Error', 'Please enter name ');
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email ');
      return false;
    }
    if (!phoneNumberRegex.test(phoneNo)) {
      Alert.alert('Error', 'Please enter a valid number ');
      return false;
    }

    return true;
  };

  return (
    <MainView>
      <View style={{flex: 1, height: SIZES.height, width: SIZES.width}}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <KeyboardAvoidingView style={styles.container}>
          <Header title="Add Profile" rightIconType="NONE" />
          <View style={styles.popupContainer}>
            <ScrollView>
              <View style={styles.enterDetailsContainer}>
                <Text style={{...FONTS.h3, marginLeft: 25}}>Flat No</Text>
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

                <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>
                  Name
                </Text>
                <ProfileTextInput
                  title={name}
                  disabled={false}
                  onChangeText={text => setName(text)}
                  placeholder="Name"
                />
                <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>
                  Email
                </Text>
                <ProfileTextInput
                  title={email}
                  disabled={false}
                  onChangeText={text => setEmail(text)}
                  placeholder="Email"
                  keybordType="email"
                />
                <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>
                  Phone No
                </Text>
                <ProfileTextInput
                  title={phoneNo}
                  disabled={false}
                  onChangeText={text => setPhoneNo(text)}
                  placeholder="phone no"
                  keybordType="phone"
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  ...FONTS.body3,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: SIZES.spacing * 1.2,
                  paddingRight: 30,
                  backgroundColor: COLORS.white,
                  borderRadius: SIZES.spacing,
                  marginVertical: SIZES.spacing,
                }}>
                <Text
                  style={{
                    ...FONTS.h3,
                    marginLeft: 25,
                    color: COLORS.gray,
                    marginTop: 10,
                  }}>
                  Is member AOA
                </Text>

                <CheckBox
                  disabled={false}
                  value={AOA}
                  onValueChange={newValue => setAOA(newValue)}
                />
              </View>
              <SubmitButton />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </MainView>
  );
};

export default NewUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
    // paddingTop: 120,
  },
  popupContainer: {
    // height: '80%',
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  dismissButton: {
    width: 20,
    height: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  headingContainer: {
    alignItems: 'center',
    flex: 1,
  },
  separatorLine: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.lightGray1,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.primary,
    textAlign: 'center',
  },
  stockName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.gray,
    width: '80%',
    textAlign: 'center',
  },
  enterDetailsContainer: {
    // paddingHorizontal: 20,
    paddingTop: 50,
  },

  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 32,
    marginBottom: 20,
  },
  quantityContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 32,
    marginBottom: 5,
  },

  footerContainer: {
    marginTop: 30,
    paddingHorizontal: '5%',
    marginBottom: 50,
    flex: 1,
    width: '100%',
  },

  buyButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buyText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});
