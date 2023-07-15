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

import CreateComplaintsModal from '../components/CreateComplaintsModal';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {
  getAllComplaints,
  getComplaintsById,
} from '../stateManagemer/slice/ServiceSlice';
import {ComplaintType} from '../stateManagemer/models/SocietyAppModal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getStatusColor} from '../resources/Utils';

const AdminComplaints = () => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const userId = useAppSelector(state => state.userReducer.id);
  const complaints = useAppSelector(state => state.userReducer.adminComplaints);
  const [filterdList, setFilterdList] = useState<ComplaintType[]>([]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    setFilterdList(complaints ?? []);
  }, [complaints]);
  React.useEffect(() => {
    let ar = complaints?.filter(item =>
      item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()),
    );
    setFilterdList(ar ?? []);
  }, [input]);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getComplaintsById({currentUserId: userId}));
    }, []),
  );
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
              backgroundColor: getStatusColor(item.status),
              borderRadius: 5,
              height: 30,
              paddingHorizontal: '2%',
            }}>
            <Text
              style={{
                ...FONTS.h6,
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
      <Header title="Complaints" rightIconType="NONE" />
      <View
        style={{
          marginVertical: 20,
          marginLeft: 10,
          flexDirection: 'row',
          zIndex: 1,
        }}>
        <SearchBar
          searchStyle={{width: '85%'}}
          placeholder={'Search Complaints ...'}
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
              height: 30,
              width: 30,
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
        data={filterdList}
        renderItem={renderItem}
      />
      <CreateComplaintsModal onClose={() => setOpen(false)} isVisible={open} />
    </MainView>
  );
};

export default AdminComplaints;

const styles = StyleSheet.create({});
