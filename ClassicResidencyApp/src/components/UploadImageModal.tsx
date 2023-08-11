import {
  Alert,
  Image,
  Linking,
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
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: any;
}
const UploadImageModal = (props: ModalProps) => {
  const [imageFile, setImageFile] = React.useState<any>();
  const [imageName, setImageName] = React.useState('');

  function openCamera() {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        await props.onSelect(image);
        props.onClose();
      })
      .catch(error => {
        console.log('Image picker error:', error);
        // Handle the error here
      });
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  }
  function openGallery() {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperToolbarTitle: 'Crop Image',
    })
      .then(async image => {
        await props.onSelect(image);
        props.onClose();
        console.log(image, 'Gallery Picked');
      })
      .catch(error => {
        console.log('Image picker error:', error);
        // Handle the error here
      });
  }

  const handleCameraPermissionDenied = () => {
    Alert.alert(
      'Camera Permission Required',
      'Please enable camera permissions for the app in the settings to use this feature.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Open Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
    );
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        // If CAMERA Permission is granted
        if (granted === 'never_ask_again') {
          handleCameraPermissionDenied();
        }
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err + '');
      }
      return false;
    } else return true;
  };

  const captureImage = async () => {
    let options: CameraOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
    };
    // let isCameraPermitted = await requestCameraPermission();

    // let isStoragePermitted = await requestExternalWritePermission();
    // if (isCameraPermitted && isStoragePermitted) {
    launchCamera(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response?.errorMessage ?? '');
        return;
      }
      await props.onSelect(response);
      props.onClose();
      console.log(response, 'Gallery Picked');

      // setFilePath(response);
    });
    // }
  };

  const chooseFile = () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        console.log(response?.errorMessage ?? '');
        return;
      }
      await props.onSelect(response);
      props.onClose();
      console.log(response, 'Gallery Picked');
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      // setFilePath(response);
    });
  };

  return (
    <Modal visible={true} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'tranparent',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            // height: '40%',
            width: '80%',
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
                paddingHorizontal: 25,
                paddingVertical: 15,
                width: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  flex: 1,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}>
                Select Option
              </Text>
              <TouchableOpacity
                style={{
                  width: 45,
                  height: 45,
                  marginRight: '-10%',
                  backgroundColor: COLORS.primary,
                  ...SHADOW,

                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={props.onClose}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.white,
                  }}
                  source={ICONS.CLOSE_ICON}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <CustomBtn
              title="Camera"
              onPress={() => {
                captureImage();
              }}
              disabled={false}
              shadow={'DEFAULT'}
              color={COLORS.primary}
            />
            <CustomBtn
              title="Gallery"
              onPress={() => {
                chooseFile();
              }}
              disabled={false}
              shadow={'DEFAULT'}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UploadImageModal;

const styles = StyleSheet.create({});
