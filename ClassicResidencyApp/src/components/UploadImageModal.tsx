import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../resources';
import {FONTS, SHADOW, SHADOW_PRIMARY, SIZES} from '../resources/Theme';
import CustomBtn from './CustomBtn';
import Icon, {Icons} from './Icons';
import ImageCropPicker from 'react-native-image-crop-picker';

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
        console.log(image);
      })
      .catch(error => {
        console.log('Image picker error:', error);
        // Handle the error here
      });
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
                paddingHorizontal: 25,
                paddingVertical: 15,
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  right: -50,
                  ...FONTS.h2,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}>
                Select Option
              </Text>
              <TouchableOpacity
                style={{
                  width: 45,
                  height: 45,
                  backgroundColor: COLORS.white,
                  ...SHADOW,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginTop: -80,
                  right: -SIZES.width * 0.26,
                }}
                onPress={props.onClose}>
                <Icon
                  type={Icons.FontAwesome}
                  name={'close'}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <CustomBtn
              title="Camera"
              onPress={() => {
                openCamera();
              }}
              disabled={false}
              shadow={'DEFAULT'}
              color={COLORS.primary}
            />
            <CustomBtn
              title="Gallery"
              onPress={() => {
                openGallery();
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
