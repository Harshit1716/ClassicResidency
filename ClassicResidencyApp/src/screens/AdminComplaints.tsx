import {
  Alert,
  FlatList,
  StatusBar,
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
import ComplaintsFilterModal from '../components/ComplaintsFilterModal';
import NoDataFound from '../components/NoDataFound';

const AdminComplaints = () => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const userId = useAppSelector(state => state.userReducer.id);
  const complaints = useAppSelector(state => state.userReducer.adminComplaints);
  const members = useAppSelector(state => state.userReducer.members);
  const [filterdList, setFilterdList] = useState<ComplaintType[]>([]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [block, setBlock] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  React.useEffect(() => {
    setFilterdList(complaints ?? []);
  }, [complaints]);
  React.useEffect(() => {
    let ar = complaints?.filter(
      item =>
        item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()) &&
        item.status.includes(status) &&
        item.type.includes(type) &&
        item?.flatNo?.[0].toLowerCase().includes(block.toLowerCase()),
    );
    setFilterdList(ar ?? []);
  }, [input]);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllComplaints());
    }, []),
  );

  React.useEffect(() => {
    let ar = complaints?.filter(
      item =>
        item.status.includes(status) &&
        item.type.includes(type) &&
        item?.flatNo?.[0].toLowerCase().includes(block.toLowerCase()),
    );
    console.log(ar?.[0]?.flatNo?.[0].toLowerCase(), block, 'HAhAh');
    setFilterdList(ar ?? []);
  }, [block, type, status]);

  const handleFilter = (
    txtStatus: string,
    txtBlock: string,
    txtType: string,
  ) => {
    setStatus(txtStatus);
    setType(txtType);
    setBlock(txtBlock);
  };
  const renderItem = ({item, index}: {item: ComplaintType; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AdminComplaintDetail', {data: item});
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
            <Text style={{...FONTS.h3, color: COLORS.black}}>{item.type}</Text>
            {item.assignedTo != '' && (
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 20, width: 20, marginRight: 10}}
                  source={ICONS.PROFILE_ICON}
                />
                <Text style={{...FONTS.body7, color: COLORS.black}}>
                  {members.filter(obj => obj?.id === item.assignedTo)[0]?.name}
                </Text>
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
                ...FONTS.body7,
                textAlign: 'center',
                marginBottom: -5,
                color: COLORS.white,
              }}>
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={{...FONTS.h3, color: COLORS.black}}>{item.title}</Text>
        <Text numberOfLines={3} style={{...FONTS.body4, color: COLORS.black}}>
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
              <Text style={{...FONTS.body4, color: COLORS.gray}}>
                By : {item.by}
              </Text>
              <Text
                numberOfLines={3}
                style={{...FONTS.body5, color: COLORS.gray}}>
                Flat : {item.flatNo}
              </Text>
            </View>
          </View>
          <Text style={{...FONTS.body5, color: COLORS.gray}}>
            {item.createdOn}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainView>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Header title="Complaints" rightIconType="NONE" />
      <View
        style={{
          marginVertical: 20,
          marginLeft: 10,
          flexDirection: 'row',
          zIndex: 1,
        }}>
        <SearchBar
          searchStyle={{width: '87%'}}
          placeholder={'Search Complaints ...'}
          onChangeText={text => {
            setInput(text);
          }}
          value={input}
          shadow={'LIGHT'}
        />
        <TouchableOpacity
          onPress={() => setOpen(true)}
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
      {filterdList.length > 0 ? (
        <FlatList
          style={{}}
          ListFooterComponent={() => (
            <View style={{height: SIZES.height * 0.1}}></View>
          )}
          data={filterdList}
          renderItem={renderItem}
        />
      ) : (
        <NoDataFound />
      )}

      {/* <CreateComplaintsModal onClose={() => setOpen(false)} isVisible={open} /> */}
      <ComplaintsFilterModal
        onApply={handleFilter}
        onClose={() => setOpen(false)}
        isVisible={open}
      />
    </MainView>
  );
};

export default AdminComplaints;

const styles = StyleSheet.create({});
