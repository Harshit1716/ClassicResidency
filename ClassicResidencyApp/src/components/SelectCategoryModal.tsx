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

const list = [
  'AOA',
  'Plumber',
  'Electrician',
  'Guard',
  'Carpenter',
  'Painter',
  'Lift',
  'Mason',
  'HouseKeeping',
  'Intercom',
  'Gardner',
  'MainGate',
];
const SelectCategoryModal = (props: ModalProps) => {
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
                  right: -50,
                  ...FONTS.h2,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}>
                Select Type
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
                  marginTop: -70,
                  right: -125,
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
          <SearchBar
            placeholder={'Search Type'}
            onChangeText={text => {
              setInput(text);
            }}
            searchStyle={{width: '90%', alignSelf: 'center', height: 50}}
            value={input}
            shadow={'LIGHT'}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginVertical: 20}}
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
                      ...FONTS.body4,
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

export default SelectCategoryModal;

const styles = StyleSheet.create({});
