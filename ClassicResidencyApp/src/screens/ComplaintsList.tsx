import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MainView from '../components/MainView';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import {Image} from 'react-native-animatable';
// import Icon, {Icons} from '../components/Icons';
import {COLORS, FONTS, ICONS, SHADOW} from '../resources';
import {SHADOW_PRIMARY, SIZES} from '../resources/Theme';
import CreateMemberModal from '../components/CreateMemberModal';
import CreateComplaintsModal from '../components/CreateComplaintsModal';

const ComplaintsList = () => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={{
          padding: '5%',
          backgroundColor: COLORS.white,
          ...SHADOW,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: COLORS.lightGray,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.h3}}>Maintainanec</Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 20, width: 20, marginRight: 10}}
                source={ICONS.PROFILE_ICON}
              />
              <Text style={{...FONTS.body7}}>Assigned To</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.green,
              borderRadius: 5,
              height: 30,
              paddingHorizontal: '2%',
            }}>
            <Text
              style={{
                ...FONTS.body8,
                textAlign: 'center',
                marginBottom: -5,
                color: COLORS.white,
              }}>
              Pending
            </Text>
          </View>
        </View>
        <Text style={{...FONTS.h3}}>Title</Text>
        <Text numberOfLines={3} style={{...FONTS.body4}}>
          Description of the complaints{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={{...FONTS.body4}}>By : Harshit</Text>
              <Text numberOfLines={3} style={{...FONTS.body5}}>
                Flat : I-H1-702
              </Text>
            </View>
          </View>
          <Text style={{...FONTS.body5}}>12/10/23</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <MainView>
      <Header
        title="Complaints"
        rightIconType="CREATE"
        iconPress={() => setOpen(true)}
      />
      <View
        style={{
          marginVertical: 20,
          marginLeft: 10,
          flexDirection: 'row',
          zIndex: 1,
        }}>
        <SearchBar
          searchStyle={{width: '85%'}}
          placeholder={'Search Notice ...'}
          onChangeText={text => {
            setInput(text);
          }}
          value={input}
          shadow={'LIGHT'}
        />
        <TouchableOpacity
          onPress={() => Alert.alert('Pressed')}
          style={{
            marginLeft: 10,
            // backgroundColor: 'red',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Icon
            size={30}
            type={Icons.FontAwesome}
            name={'filter'}
            color={COLORS.primary}
          /> */}
        </TouchableOpacity>
      </View>
      <FlatList
        style={{}}
        ListFooterComponent={() => (
          <View style={{height: SIZES.height * 0.1}}></View>
        )}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={renderItem}
      />
      <CreateComplaintsModal onClose={() => setOpen(false)} isVisible={open} />
    </MainView>
  );
};

export default ComplaintsList;

const styles = StyleSheet.create({});
