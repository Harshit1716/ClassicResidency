import {
  Alert,
  BackHandler,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, ICONS} from '../resources';
import {FONTS, SHADOW, SHADOW_PRIMARY, SIZES} from '../resources/Theme';
import CustomBtn from './CustomBtn';
// import Icon, {Icons} from './Icons';

import AppTextInput from './AppTextInput';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {updatePassword} from '../stateManagemer/slice/ServiceSlice';
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  open?: boolean;
}
const ChangePasswordModal = (props: ModalProps) => {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const user = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const validate = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    let pas =
      user.phoneNumber == user.currentUser
        ? user.password
        : user.tenantPassword;
    if (currentPassword == '' && props.open) {
      Alert.alert('Error', 'Please enter current password');
      return false;
    }
    if (currentPassword != pas && props.open) {
      Alert.alert('Error', 'Please enter valid current password');
      return false;
    }
    if (password == '') {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Error',
        `Password mush contains :-  
        8 characters 
        1 uppercase letter
        1 lowercase letter
        1 digit
        1 special character (e.g., !@#$%^&*) 
       `,
      );
      return false;
    }
    if (confirmPassword == '' || confirmPassword != password) {
      Alert.alert('Error', 'Password and Confirm password does not match');
      return false;
    }
    return true;
  };

  const handleSavePassword = async () => {
    if (validate()) {
      dispatch(updatePassword({password, user}));
      props.onClose();
    }
  };

  return (
    <Modal visible={true} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5);',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            // height: '40%',
            width: '90%',
            ...SHADOW_PRIMARY,
            borderRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 25,
              paddingVertical: 15,
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 15,
                width: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h2,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}>
                {props.open
                  ? 'Change Password'
                  : 'Weclome to the Classic Residency App'}
              </Text>
              {props.open && (
                <TouchableOpacity
                  onPress={() => {
                    props.onClose();
                  }}
                  style={{
                    borderWidth: 1,
                    padding: '2%',
                    borderRadius: 5,
                    borderColor: COLORS.primary,
                  }}>
                  <Image
                    style={{height: 20, width: 20, tintColor: COLORS.primary}}
                    source={ICONS.CLOSE_ICON}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {!props?.open && (
            <Text
              style={{
                marginHorizontal: 10,
                ...FONTS.body4,
                color: COLORS.black,
                textAlign: 'center',
              }}>
              Currently you are using the default password. To ensure the safety
              of your data and personal information, we kindly request you to
              change your password.
            </Text>
          )}
          {props.open && (
            <AppTextInput
              value={currentPassword}
              placeholder={'Current Password'}
              onChangeText={(text: string) => {
                setCurrentPassword(text);
              }}
              editable={true}
            />
          )}
          <AppTextInput
            value={password}
            placeholder={'New Password'}
            onChangeText={(text: string) => {
              setPassword(text);
            }}
            editable={true}
          />
          <AppTextInput
            value={confirmPassword}
            placeholder={'Confirm New Password'}
            onChangeText={(text: string) => {
              setConfirmPassword(text);
            }}
            editable={true}
          />
          <CustomBtn
            title="Change Password"
            onPress={() => {
              handleSavePassword();
            }}
            disabled={false}
            shadow={'DEFAULT'}
            color={COLORS.primary}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({});
