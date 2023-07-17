import {
  Image,
  Modal,
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

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (status: string) => void;
}
const SetStatusModal = (props: ModalProps) => {
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
                {/* <Icon
                    type={Icons.FontAwesome}
                    name={'close'}
                    color={COLORS.primary}
                  /> */}
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
          </View>
          <TouchableOpacity onPress={() => {}}>
            <CustomBtn
              title="Pending"
              onPress={() => {
                props.onSelect('Pending');
              }}
              disabled={false}
              shadow={'DEFAULT'}
              color={COLORS.primary}
            />
            <CustomBtn
              title="InProgress"
              onPress={() => {
                props.onSelect('InProgress');
              }}
              disabled={false}
              shadow={'DEFAULT'}
              color={COLORS.primary}
            />
            <CustomBtn
              title="Closed"
              onPress={() => {
                props.onSelect('Closed');
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

export default SetStatusModal;

const styles = StyleSheet.create({});
