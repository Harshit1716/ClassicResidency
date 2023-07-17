import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './Header';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
// import Icon, {Icons} from './Icons';
import {SHADOW_PRIMARY} from '../resources/Theme';
import AppTextInput from './AppTextInput';
import ProfileTextInput from './ProfileTextInput';
import {ComplaintType, Notice} from '../stateManagemer/models/SocietyAppModal';
import SelectCategoryModal from './SelectCategoryModal';
import SelectAssignedToModal from './SelectAssignedToModal';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {getStatusColor, redirectToPhoneNumber} from '../resources/Utils';
import AppButton from './AppButton';
import {updateAssignedTo} from '../stateManagemer/slice/ServiceSlice';
import MainView from './MainView';
import SetStatusModal from './SetStatusModal';

const ComplaintDetail = ({route}: any) => {
  const [data, setData] = useState<ComplaintType>(route?.params?.data);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedAssigned, setSelectedAssigned] = useState('');
  const [status, setStatus] = useState('');
  const [selectedMember, setSelectedMember] = useState();
  const members = useAppSelector(state => state.userReducer.members);
  const dispatch = useAppDispatch();
  const [editable, setEditable] = useState<boolean>(false);
  const isAdmin = useAppSelector(state => state.userReducer.isAOA);

  useEffect(() => {
    setSelectedAssigned(route.params.data.assignedTo);
    setStatus(route.params.data.status);
  }, [route.params.data]);

  useEffect(() => {
    let ar = members.filter(item => item.id === selectedAssigned);
    setSelectedMember(ar[0]);
  }, [selectedAssigned]);

  const handleAssignedTo = async () => {
    if (editable && selectedAssigned != '') {
      await dispatch(
        updateAssignedTo({
          id: data.id,
          assignedTo: selectedAssigned,
          status: status,
        }),
      );
      setEditable(false);
    } else {
      Alert.alert('Error', 'Please assign complaint to a member');
    }
  };

  return (
    <MainView>
      <Header
        title="Complaint Detail"
        rightIconType={isAdmin ? (editable ? 'CANCEL' : 'EDIT') : 'NONE'}
        iconPress={() => {
          if (editable == false) setEditable(true);
          else if (editable == true) setEditable(false);
        }}
      />
      <ScrollView>
        <View
          style={{
            width: '95%',
            // height: SIZES.height * 1.4,
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            marginTop: '5%',
            marginBottom: '35%',
            borderRadius: 10,
            padding: '5%',
            ...SHADOW,
          }}>
          <Text
            style={{...FONTS.h2, textAlign: 'center', color: COLORS.primary}}>
            {data.title}
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.lightGray,
              width: '95%',
              alignSelf: 'center',
              marginVertical: 15,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Text style={{...FONTS.body4}}>By : {data.by}</Text>
              <Text style={{...FONTS.body4}}>Date : {data.createdOn}</Text>
            </View>
            <TouchableOpacity
              style={{
                width: '30%',
                // alignSelf: 'center',
                overflow: 'hidden',
                ...FONTS.body3,
                padding: 8,
                // textAlign: 'center',
                backgroundColor: getStatusColor(status ?? 'Pending'),
                borderRadius: 5,
                marginVertical: SIZES.spacing,
                // color: COLORS.white,
              }}
              disabled={!editable}
              onPress={() => {
                if (editable) {
                  setOpen2(true);
                }
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  ...FONTS.body5,

                  color: COLORS.white,
                }}>
                {status}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...FONTS.h3, marginTop: 10}}>Service :</Text>
            <Text
              style={{
                ...FONTS.h3,
                marginLeft: 5,
                color: COLORS.primary,
                marginTop: 10,
              }}>
              {data.type}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{...FONTS.h3, marginTop: 10}}>Flat No :</Text>
            <Text
              style={{
                ...FONTS.h3,
                marginLeft: 5,
                color: COLORS.primary,
                marginTop: 10,
              }}>
              {data.flatNo}
            </Text>
          </View>
          {data.imageUrl && (
            <>
              <Text style={{...FONTS.h3, marginTop: 10}}>Image</Text>
              <Image
                style={{
                  height: 250,
                  width: '100%',
                  marginVertical: '5%',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
                source={{uri: data.imageUrl + ''}}></Image>
            </>
          )}
          <Text style={{...FONTS.h3, marginTop: 10}}>Description</Text>
          <Text
            style={{
              width: '100%',
              ...FONTS.body3,
              padding: SIZES.spacing * 1.2,
              backgroundColor: COLORS.lightPrimary,
              borderRadius: SIZES.spacing,
              marginVertical: SIZES.spacing,
            }}>
            {data.description}
          </Text>
          <Text style={{...FONTS.h3, marginTop: 10}}>Preffered Time</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginVertical: 8,
            }}>
            {data.slots.map((chip, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  {
                    // backgroundColor: '#e0e0e0',
                    backgroundColor: COLORS.lightBlue,
                    borderRadius: 5,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    margin: 4,
                    ...SHADOW,
                    borderWidth: 0.5,
                    borderColor: COLORS.lightGray,
                  },
                ]}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 14,
                  }}>
                  {chip}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{...FONTS.h3, marginTop: 10}}>Assigned To :</Text>
          {editable && (
            <TouchableOpacity
              style={{overflow: 'hidden'}}
              onPress={() => {
                setOpen(true);
              }}>
              <Text
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  ...FONTS.body3,
                  padding: SIZES.spacing * 1.2,
                  backgroundColor: COLORS.lightPrimary,
                  borderRadius: 10,
                  marginVertical: SIZES.spacing,
                  color: COLORS.gray,
                }}>
                {selectedAssigned === ''
                  ? 'Select Assigned To'
                  : selectedMember?.name}
              </Text>
            </TouchableOpacity>
          )}
          {selectedMember !== undefined && selectedMember !== null && (
            <View
              style={{
                padding: '5%',
                backgroundColor: COLORS.white,
                marginVertical: 15,
                borderRadius: 10,
                // ...SHADOW_PRIMARY,
                ...SHADOW,
                flexDirection: 'row',
              }}>
              <Image
                style={{height: 50, width: 50, borderRadius: 50}}
                source={{uri: selectedMember?.imageUrl + ''}}></Image>
              <View style={{flex: 1, paddingHorizontal: '5%'}}>
                <Text style={{...FONTS.h3}}>{selectedMember?.name}</Text>
                <Text style={{...FONTS.body5, color: COLORS.gray}}>
                  Contact No:- {selectedMember?.phoneNumber}
                </Text>
                <Text style={{...FONTS.body5, color: COLORS.gray}}>
                  {selectedMember?.type}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  redirectToPhoneNumber(selectedMember?.phoneNumber + '')
                }
                style={{justifyContent: 'center'}}>
                <Image
                  style={{height: 30, width: 30}}
                  source={ICONS.CALL_ICON}></Image>
              </TouchableOpacity>
            </View>
          )}
          {editable && (
            <AppButton
              disabled={false}
              title="Save"
              onPress={() => handleAssignedTo()}
            />
          )}
        </View>
      </ScrollView>
      {open && (
        <SelectAssignedToModal
          type={data.type}
          selected={selectedAssigned}
          isVisible={open}
          onClose={() => setOpen(false)}
          onSelect={setSelectedAssigned}
        />
      )}
      {open2 && (
        <SetStatusModal
          isVisible={open2}
          onClose={() => {
            setOpen2(false);
          }}
          onSelect={txt => {
            setStatus(txt);
            setOpen2(false);
          }}
        />
      )}
    </MainView>
  );
};

export default ComplaintDetail;

const styles = StyleSheet.create({});
