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
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import AppTextInput from './AppTextInput';
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}
const ChangePasswordModal = (props: ModalProps) => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const validate = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

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

  const handleSavePassword = () => {
    if (validate()) {
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
                  ...FONTS.h2,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}>
                Weclome to the Classic Residency App
              </Text>
            </View>
          </View>
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
