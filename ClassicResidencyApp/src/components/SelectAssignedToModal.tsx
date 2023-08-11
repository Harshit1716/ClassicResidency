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
import {FONTS, SHADOW, SHADOW_PRIMARY, SIZES} from '../resources/Theme';
import CustomBtn from './CustomBtn';
// import Icon, {Icons} from './Icons';
import ImageCropPicker from 'react-native-image-crop-picker';
import SearchBar from './SearchBar';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {Members} from '../stateManagemer/models/SocietyAppModal';
import {redirectToPhoneNumber} from '../resources/Utils';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: any;
  selected: string;
  type: string;
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
  'HouseHelp',
  'Intercom',
  'Gardner',
  'MainGate',
];
const SelectAssignedToModal = (props: ModalProps) => {
  const members = useAppSelector(state => state.userReducer.members);
  const [memberFilteredList, setMemberFilteredList] = useState<Members[]>([]);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const [selected, setSelected] = React.useState(props.selected);
  const [filteredList, setFilteredList] = useState(list);

  React.useEffect(() => {
    if (members) {
      let ar = members.filter(item =>
        item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()),
      );
      setMemberFilteredList(ar);
    }
  }, [input]);
  React.useEffect(() => {
    let ar = members.filter(item => item.type == props.type);

    setMemberFilteredList(ar);
  }, [props.selected]);

  const handlePress = (item: string) => {
    props.onSelect(item);
    props.onClose();
  };
  const renderMainItem = ({item, index}: {item: Members; index: number}) => {
    let isSelected = item.id === props.selected;
    return (
      <TouchableOpacity
        onPress={() => {
          handlePress(item.id);
        }}
        style={{
          marginHorizontal: 10,
          padding: '5%',
          backgroundColor: COLORS.white,
          marginBottom: 15,
          borderRadius: 10,
          ...SHADOW,
          flexDirection: 'row',
        }}>
        <Image
          style={{height: 50, width: 50, borderRadius: 50}}
          source={{uri: item.imageUrl + ''}}></Image>
        <View style={{flex: 1, paddingHorizontal: '5%'}}>
          <Text
            style={{
              ...FONTS.h3,
              color: isSelected ? COLORS.headerSecond : COLORS.black,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: isSelected ? COLORS.headerSecond : COLORS.gray,
            }}>
            Contact No:- {item.phoneNumber}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              color: isSelected ? COLORS.headerSecond : COLORS.gray,
            }}>
            {item.type}
          </Text>
        </View>
        {selected && (
          <TouchableOpacity
            onPress={() => redirectToPhoneNumber(item.phoneNumber + '')}
            style={{justifyContent: 'center'}}>
            <Image
              style={{height: 30, width: 30}}
              source={ICONS.SELECTED_ICON}></Image>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
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
            backgroundColor: COLORS.lightPrimary,
            height: '80%',
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
                  // right: -50,
                  ...FONTS.h2,
                  color: COLORS.primary,
                  textAlign: 'center',
                }}>
                Select Member
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
                  // marginTop: -70,
                  right: -SIZES.width * 0.1,
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
            placeholder={'Search Member'}
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
            data={memberFilteredList}
            renderItem={renderMainItem}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectAssignedToModal;

const styles = StyleSheet.create({});
