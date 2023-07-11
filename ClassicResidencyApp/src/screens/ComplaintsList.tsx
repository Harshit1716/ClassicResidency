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
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {getComplaintsById} from '../stateManagemer/slice/ServiceSlice';
import {ComplaintType} from '../stateManagemer/models/SocietyAppModal';
import {useNavigation} from '@react-navigation/native';

const ComplaintsList = () => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const userId = useAppSelector(state => state.userReducer.id);
  const complaints = useAppSelector(state => state.userReducer.complaints);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    dispatch(getComplaintsById({currentUserId: userId}));
  }, []);
  const renderItem = ({item, index}: {item: ComplaintType; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ComplaintDetail', {data: item});
        }}
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
            <Text style={{...FONTS.h3}}>{item.type}</Text>
            {item.assignedTo != '' && (
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 20, width: 20, marginRight: 10}}
                  source={ICONS.PROFILE_ICON}
                />
                <Text style={{...FONTS.body7}}>{item.assignedTo}</Text>
              </TouchableOpacity>
            )}
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
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={{...FONTS.h3}}>{item.title}</Text>
        <Text numberOfLines={3} style={{...FONTS.body4}}>
          {item.description}
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
              <Text style={{...FONTS.body4}}>By : {item.by}</Text>
              <Text numberOfLines={3} style={{...FONTS.body5}}>
                Flat : {item.flatNo}
              </Text>
            </View>
          </View>
          <Text style={{...FONTS.body5}}>{item.createdOn}</Text>
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
          <Image
            style={{
              height: 35,
              width: 35,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
            source={ICONS.FILTER_ICON}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{}}
        ListFooterComponent={() => (
          <View style={{height: SIZES.height * 0.1}}></View>
        )}
        data={complaints}
        renderItem={renderItem}
      />
      <CreateComplaintsModal onClose={() => setOpen(false)} isVisible={open} />
    </MainView>
  );
};

export default ComplaintsList;

const styles = StyleSheet.create({});
