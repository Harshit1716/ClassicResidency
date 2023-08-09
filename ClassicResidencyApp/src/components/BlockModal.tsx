import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, ICONS} from '../resources';
import {FONTS, SHADOW, SHADOW_PRIMARY} from '../resources/Theme';
import CustomBtn from './CustomBtn';
// import Icon, {Icons} from './Icons';
import ImageCropPicker from 'react-native-image-crop-picker';
import SearchBar from './SearchBar';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: any;
  selected: string;
}

const list = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'SH'];
const BlockModal = (props: ModalProps) => {
  const [input, setInput] = React.useState('');
  const [selected, setSelected] = React.useState(props.selected);
  const [filteredList, setFilteredList] = useState(list);

  useEffect(() => {
    let ar = list.filter(item =>
      item.toLocaleLowerCase().includes(input.toLocaleLowerCase()),
    );
    setFilteredList(ar);
  }, [input]);

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
            backgroundColor: COLORS.lightPrimary,
            height: '70%',
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
                paddingVertical: 10,
                width: '100%',
                alignItems: 'center',

                borderBottomWidth: 1,
                borderBottomColor: COLORS.lightGray,
              }}>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h2,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}>
                Select Block
              </Text>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: COLORS.white,
                  ...SHADOW,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
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

          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginBottom: 20}}
            data={filteredList}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.onSelect(item);
                    setSelected(item);
                    props.onClose();
                  }}
                  style={{
                    margin: 10,
                    padding: '3%',
                    backgroundColor:
                      selected == item ? COLORS.primary : 'white',
                    ...SHADOW,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      ...FONTS.h3,
                      color: selected == item ? COLORS.white : COLORS.gray,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default BlockModal;

const styles = StyleSheet.create({});
