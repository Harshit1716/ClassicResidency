import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Modal,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  AlertButton,
  BackHandler,
  Platform,
} from 'react-native';
import {COLORS, FONTS, ICONS, SIZES} from '../resources';
import ProfileTextInput from './ProfileTextInput';
// import Icon, {Icons} from './Icons';
import {SHADOW, SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';
import ImageCropPicker from 'react-native-image-crop-picker';
import AppButton from './AppButton';
import CustomBtn from './CustomBtn';
import UploadImageModal from './UploadImageModal';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {
  addTenant,
  createMember,
  createNotice,
} from '../stateManagemer/slice/ServiceSlice';
import SelectCategoryModal from './SelectCategoryModal';
import CheckBox from '@react-native-community/checkbox';

const AddProfileModal = ({isVisible, onClose}: any) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');

  const [tenant, settenant] = useState(false);
  const [open, setOpen] = useState(false);

  const [imageFile, setImageFile] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userReducer.id);

  const header = () => {
    return (
      <View style={{}}>
        <View style={styles.headerContainer}>
          <View style={{marginRight: -40, ...styles.headingContainer}}>
            <Text style={styles.headerTitle}>Add Member</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              backgroundColor: COLORS.white,
              ...SHADOW,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: -50,
              right: -20,
            }}
            onPress={onClose}>
            <Image
              source={ICONS.CLOSE_ICON}
              style={{height: 20, tintColor: COLORS.primary, width: 20}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.separatorLine} />
      </View>
    );
  };

  function reset() {
    setName('');
    setNumber('');
    setEmail('');
    deleteImage();
  }

  function handleSubmit() {
    if (validate()) {
      dispatch(
        addTenant({
          userId: userId,
          name: name,
          number: number,
          email: email,
          image: imageFile,
          isTenant: tenant,
          actionType: 'ADD',
        }),
      );
      onClose();
      reset();
    }
  }

  const SubmitButton = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buyButton}>
          <Text style={styles.buyText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function deleteImage() {
    setImageFile(null);
  }

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    // !phoneNumberRegex.test(number)
    if (name.length == 0 || name.length < 3) {
      Alert.alert('Error', 'Please enter a valid Name ');
      return false;
    }
    if (number.length == 0 || !phoneNumberRegex.test(number)) {
      Alert.alert('Error', 'Please enter a valid number ');
      return false;
    }
    if (email.length == 0 || !emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email ');
      return false;
    }
    if (imageFile == null) {
      Alert.alert('Error', 'Please upload an image ');
      return false;
    }

    return true;
  };

  return (
    <Modal
      style={{height: 10}}
      animationType={'slide'}
      transparent={true}
      visible={isVisible}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.popupContainer}>
          {header()}
          <ScrollView>
            <View style={styles.enterDetailsContainer}>
              <Text style={{...FONTS.h3, marginLeft: 25, color: COLORS.gray}}>
                Name
              </Text>
              <ProfileTextInput
                title={name}
                disabled={false}
                onChangeText={text => setName(text)}
                placeholder="Title"
              />

              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: 25,
                  color: COLORS.gray,
                  marginTop: 10,
                }}>
                Contact Number
              </Text>
              <ProfileTextInput
                title={number}
                disabled={false}
                onChangeText={text => setNumber(text)}
                placeholder="Contact Number"
                keybordType="phone"
              />
              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: 25,
                  color: COLORS.gray,
                  marginTop: 10,
                }}>
                Email
              </Text>
              <ProfileTextInput
                title={email}
                disabled={false}
                onChangeText={text => setEmail(text)}
                placeholder="Email"
                keybordType="email"
              />
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
                  Is member tenant
                </Text>

                <CheckBox
                  disabled={false}
                  value={tenant}
                  onValueChange={newValue => settenant(newValue)}
                />
              </View>
            </View>
            {imageFile == null && (
              <TouchableOpacity
                style={{marginTop: 20}}
                onPress={() => {
                  setOpen(true);
                }}>
                <View
                  style={{
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    backgroundColor: 'transparent',
                    marginHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      paddingVertical: 12,
                      textAlign: 'center',
                      fontSize: 16,
                      fontFamily: 'Poppins',
                    }}>
                    Upload Image
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {imageFile != null && (
              <View style={{marginTop: 20, alignSelf: 'center'}}>
                <Text style={{...FONTS.h3, color: COLORS.gray, marginTop: 10}}>
                  Image
                </Text>
                <ImageBackground
                  resizeMode="stretch"
                  style={{
                    borderRadius: 20,
                    height: 200,
                    width: SIZES.width * 0.8,
                    marginTop: 30,
                  }}
                  source={{uri: imageFile?.assets?.[0]?.uri + ''}}>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: -20,
                      backgroundColor: COLORS.primary,
                      ...SHADOW,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      marginTop: -30,
                      alignSelf: 'flex-end',
                    }}
                    onPress={() => deleteImage()}>
                    <Image
                      source={ICONS.CLOSE_ICON}
                      style={{height: 20, tintColor: COLORS.white, width: 20}}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}
            <SubmitButton />
          </ScrollView>
        </View>
        {open && (
          <UploadImageModal
            isVisible={open}
            onClose={() => setOpen(false)}
            onSelect={setImageFile}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
    // paddingTop: 120,
  },
  popupContainer: {
    height: '80%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
    paddingTop: 25,
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
