import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
import Header from '../components/Header';
import {SHADOW_PRIMARY} from '../resources/Theme';

import ProfileModal from '../components/AddProfileModal';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {
  addTenant,
  uploadProfilePic,
} from '../stateManagemer/slice/ServiceSlice';
import UploadImageModal from '../components/UploadImageModal';
import MainView from '../components/MainView';
import SetStatusModal from '../components/SetStatusModal';

const ProfileDetail = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [tName, setTName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPhoneNo, setTPhoneNo] = useState('');
  const user = useAppSelector(state => state.userReducer);
  const [editable, setEditable] = useState<boolean>(false);
  const [imageFile, setImageFile] = React.useState<any>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user.currentUser === user.phoneNumber) {
      setName(user.ownerName);
      setPhoneNo(user.phoneNumber);
      setEmail(user.email);

      if (user.tenantName != '') {
        setTName(user?.tenantName ?? '');
        setTPhoneNo(user?.tenantPhoneNumber ?? '');
        setTEmail(user?.tenantEmail ?? '');
      }
    } else if (user.currentUser === user.tenantPhoneNumber) {
      setName(user?.tenantName ?? '');
      setPhoneNo(user?.tenantPhoneNumber ?? '');
      setEmail(user?.tenantEmail ?? '');
      setTName(user.ownerName);
      setTPhoneNo(user.phoneNumber);
      setTEmail(user.email);
    }
  }, [user]);

  console.log(user.email);
  const TextView = (txt: string) => {
    return (
      <Text
        style={{
          width: '90%',
          alignSelf: 'center',
          ...FONTS.body4,
          padding: SIZES.spacing * 1.2,
          alignItems: 'center',
          backgroundColor: COLORS.lightPrimary,
          borderRadius: SIZES.spacing,
          marginVertical: SIZES.spacing,
          color: COLORS.black,
        }}>
        {txt}
      </Text>
    );
  };
  return (
    <MainView style={{flex: 1}}>
      <Header
        iconPress={() => {
          if (editable == false) setEditable(true);
          else if (editable == true) {
            setImageFile(null);
            setEditable(false);
          }
        }}
        title="Profile"
        rightIconType={editable ? 'CANCEL' : 'EDIT'}
      />
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.headerSecond]}
          style={{flex: 1}}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          locations={[0, 0.7]}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: Platform.OS == 'ios' ? 65 : 15,
              paddingVertical: 10,
              height: SIZES.height * 0.05,
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}></View>
        </LinearGradient>
      </View>

      <ScrollView>
        <View
          style={{
            width: '90%',
            marginVertical: 20,
            borderRadius: 20,
            alignSelf: 'center',
            backgroundColor: COLORS.white,
            ...SHADOW,
            paddingTop: '10%',
            paddingBottom: '10%',

            // height: SIZES.height,
          }}>
          {editable && (
            <TouchableOpacity
              onPress={async () => {
                if (imageFile == null) setOpen2(true);
                else {
                  await dispatch(
                    uploadProfilePic({
                      image: imageFile,
                      flag: user.currentUser === user.phoneNumber,
                      userId: user.id,
                    }),
                  );
                  setImageFile(null);
                  setEditable(false);
                }
              }}
              style={{
                width: '50%',
                padding: '3%',
                marginVertical: 20,
                alignSelf: 'flex-start',
                marginLeft: 20,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                ...SHADOW,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                  // flex: 1,
                  // marginRight: 20,
                  textAlign: 'center',
                }}>
                {imageFile == null ? 'Select Image' : 'Upload Image'}
              </Text>
            </TouchableOpacity>
          )}
          <Text style={{...FONTS.h3, marginLeft: 20}}>Name</Text>
          {TextView(name)}
          <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
            Email
          </Text>
          {TextView(email)}
          <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
            Phone Number
          </Text>
          {TextView(phoneNo)}
        </View>
        {(user?.tenantName == undefined || user.tenantName == '') &&
          !user.tenantName &&
          editable && (
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{
                width: '80%',
                padding: '3%',

                alignSelf: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.primary,
                ...SHADOW,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                  // flex: 1,
                  // marginRight: 20,
                  textAlign: 'center',
                }}>
                Add Member
              </Text>
            </TouchableOpacity>
          )}
        {user.tenantName !== '' && user.tenantName && (
          <View
            style={{
              width: '90%',
              borderRadius: 20,
              alignSelf: 'center',
              backgroundColor: COLORS.white,
              ...SHADOW,
              paddingTop: '5%',
              paddingBottom: '10%',
              marginBottom: 100,
            }}>
            <Text style={{...FONTS.h3, marginLeft: 20, marginBottom: 20}}>
              Other Member
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={
                  user.currentUser === user.phoneNumber
                    ? user.tenantImage && user?.tenantImage != ''
                      ? {uri: user.tenantImage + ''}
                      : ICONS.PROFILE_ICON
                    : user.imageUrl && user?.imageUrl != ''
                    ? {uri: user.imageUrl}
                    : ICONS.PROFILE_ICON
                }
                style={{
                  // alignSelf: 'center',
                  width: 80,
                  height: 80,
                  backgroundColor: COLORS.lightGray,
                  borderRadius: 75,
                  marginLeft: 10,
                  marginBottom: 10,
                  zIndex: 1,
                }}
              />
              <View style={{flex: 1}}>
                <Text style={{...FONTS.h3, marginLeft: 20}}>Name</Text>
                {TextView(tName)}
              </View>
            </View>

            <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
              Email
            </Text>
            {TextView(tEmail)}
            <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
              Phone Number
            </Text>
            {TextView(tPhoneNo)}
            {user.currentUser === user.phoneNumber && editable && (
              <TouchableOpacity
                onPress={async () => {
                  await dispatch(
                    addTenant({
                      userId: user.id,
                      name: '',
                      number: '',
                      email: '',
                      image: null,
                      isTenant: '',
                    }),
                  );
                }}
                style={{
                  width: '80%',
                  padding: '3%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                  marginTop: 20,
                  ...SHADOW,
                }}>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.white,
                    // flex: 1,
                    // marginRight: 20,
                    textAlign: 'center',
                  }}>
                  Delete Member
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
          //   marginTop: '25%',
          marginTop: Platform.OS == 'ios' ? (SIZES.height > 812 ? 65 : 65) : 10,
        }}>
        <View>
          <Image
            resizeMode="contain"
            source={
              user.currentUser === user.phoneNumber
                ? user.imageUrl
                  ? imageFile != null
                    ? {uri: imageFile.path + ''}
                    : {uri: user.imageUrl + ''}
                  : imageFile != null
                  ? {uri: imageFile.path + ''}
                  : ICONS.PROFILE_ICON
                : user.tenantImage
                ? imageFile != null
                  ? {uri: imageFile.path + ''}
                  : {uri: user.tenantImage + ''}
                : imageFile != null
                ? {uri: imageFile.path + ''}
                : ICONS.PROFILE_ICON
            }
            style={styles.profilePicture}></Image>
        </View>
      </View>
      <ProfileModal
        isVisible={open}
        onClose={() => setOpen(false)}
        // user={{name: 'harry', email: 'asdada', bio: 'asdsad'}}
      />
      {open2 && (
        <UploadImageModal
          isVisible={open2}
          onClose={() => setOpen2(false)}
          onSelect={setImageFile}
        />
      )}
    </MainView>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  header: {
    zIndex: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
  },

  headerTitle: {
    color: COLORS.white,
    ...FONTS.h2,
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: '1%',
    backgroundColor: COLORS.white,
    paddingBottom: 20,

    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  profilePicture: {
    alignSelf: 'center',
    width: Platform.OS == 'android' ? 110 : SIZES.height > 812 ? 120 : 120,
    marginTop: '15%',
    height: Platform.OS == 'android' ? 110 : SIZES.height > 812 ? 120 : 120,
    backgroundColor: COLORS.lightGray,
    borderRadius: 75,
    zIndex: 1,
  },
  inputContainer: {
    marginTop: 10,
    zIndex: 1,
    width: Platform.OS == 'ios' ? (SIZES.height > 812 ? '90%' : '85%') : '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS == 'ios' ? (SIZES.height > 812 ? 15 : 12) : 15,
    alignItems: 'center',
    ...SHADOW_PRIMARY,
  },
});
