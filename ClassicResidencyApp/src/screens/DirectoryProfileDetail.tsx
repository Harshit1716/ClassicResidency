import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
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
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import MainView from '../components/MainView';
import ProfileTextInput from '../components/ProfileTextInput';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import {updateProfile} from '../stateManagemer/slice/ServiceSlice';
const DirectoryDetailProfile = ({route}: any) => {
  const [password, setPassword] = useState('');
  const [tenantPassword, setTenantPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [tName, setTName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPhoneNo, setTPhoneNo] = useState('');
  const user = useAppSelector(state => state.userReducer);
  const isAdmin = useAppSelector(state => state.userReducer.isAdmin);
  const isLoading = useAppSelector(state => state.userReducer.loading);
  const [editable, setEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = React.useState<any>(null);

  const dispatch = useAppDispatch();

  async function fetchUser(id: string) {
    const userRef = firestore().collection('Users').doc(id);
    let data = await (await userRef.get()).data();
    console.log(data, 'BBBBBCCCC');
    if (data != null) {
      setName(data.ownerName);
      setPhoneNo(data.phoneNumber);
      setEmail(data.email);
      setPassword(data.password);
      if (data.tenantName != '') {
        setTName(data?.tenantName ?? '');
        setTPhoneNo(data?.tenantPhoneNumber ?? '');
        setTEmail(data?.tenantEmail ?? '');
        setTenantPassword(data?.tenantPassword ?? '');
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    fetchUser(route.params.block.id);
  }, [route]);

  const handleUpdateProfile = async () => {
    await dispatch(
      updateProfile({
        userId: route?.params?.block?.id,
        ownerName: name,
        email: email,
        password: password,
        phoneNumber: phoneNo,
        tenantName: tName,
        tenantEmail: tEmail,
        tenantPassword: tenantPassword,
        tenantPhoneNumber: tPhoneNo,
      }),
    );
    setEditable(false);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <Header
        iconPress={() => {
          if (editable == false) setEditable(true);
          else if (editable == true) {
            setImageFile(null);
            setEditable(false);
          }
        }}
        title={`${route?.params.block.block}-${route?.params.block.flatType}-${route?.params.block.flatNumber}`}
        rightIconType={isAdmin ? (editable ? 'CANCEL' : 'EDIT') : 'NONE'}
      />

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
          <Text style={{...FONTS.h3, marginLeft: 20, marginBottom: 20}}>
            Owner
          </Text>
          <Text style={{...FONTS.h4, marginLeft: 20, color: COLORS.gray}}>
            Name
          </Text>

          <ProfileTextInput
            title={name}
            onChangeText={text => setName(text)}
            placeholder={'Name'}
            disabled={!editable}></ProfileTextInput>

          <Text
            style={{
              ...FONTS.h4,
              marginLeft: 20,
              color: COLORS.gray,
              marginTop: 10,
            }}>
            Email
          </Text>
          <ProfileTextInput
            title={email}
            onChangeText={text => setEmail(text)}
            placeholder={'Email'}
            disabled={!editable}></ProfileTextInput>
          <Text
            style={{
              ...FONTS.h4,
              marginLeft: 20,
              color: COLORS.gray,
              marginTop: 10,
            }}>
            Phone Number
          </Text>
          <ProfileTextInput
            title={phoneNo}
            onChangeText={text => setPhoneNo(text)}
            placeholder={'Phone Number'}
            disabled={!editable}></ProfileTextInput>
          <Text
            style={{
              ...FONTS.h4,
              marginLeft: 20,
              color: COLORS.gray,
              marginTop: 10,
            }}>
            Password
          </Text>
          <ProfileTextInput
            title={password}
            onChangeText={text => setPassword(text)}
            placeholder={'Password'}
            disabled={!editable}></ProfileTextInput>

          {tName !== '' && tName && (
            <View style={{marginTop: 20}}>
              <Text style={{...FONTS.h3, marginLeft: 20, marginBottom: 20}}>
                Other Member
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{...FONTS.h4, marginLeft: 20, color: COLORS.gray}}>
                    Name
                  </Text>
                  <ProfileTextInput
                    title={tName}
                    onChangeText={text => setTName(text)}
                    placeholder={'Name'}
                    disabled={!editable}></ProfileTextInput>
                </View>
              </View>

              <Text
                style={{
                  ...FONTS.h4,
                  marginLeft: 20,
                  color: COLORS.gray,
                  marginTop: 10,
                }}>
                Email
              </Text>
              <ProfileTextInput
                title={tEmail}
                onChangeText={text => setTEmail(text)}
                placeholder={'Email'}
                disabled={!editable}></ProfileTextInput>
              <Text
                style={{
                  ...FONTS.h4,
                  marginLeft: 20,
                  color: COLORS.gray,
                  marginTop: 10,
                }}>
                Phone Number
              </Text>
              <ProfileTextInput
                title={tPhoneNo}
                onChangeText={text => setTPhoneNo(text)}
                placeholder={'Phone Number'}
                disabled={!editable}></ProfileTextInput>
              {isAdmin && (
                <>
                  <Text
                    style={{
                      ...FONTS.h4,
                      marginLeft: 20,
                      color: COLORS.gray,
                      marginTop: 10,
                    }}>
                    Password
                  </Text>
                  <ProfileTextInput
                    title={tenantPassword}
                    onChangeText={text => setTenantPassword(text)}
                    placeholder={'Password'}
                    disabled={!editable}></ProfileTextInput>
                </>
              )}
            </View>
          )}
        </View>
        {editable && (
          <TouchableOpacity
            onPress={() => handleUpdateProfile()}
            style={{
              width: '80%',
              padding: '3%',
              alignSelf: 'center',
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 50,
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
              Update
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      {(loading || isLoading) && <Loader />}
    </View>
  );
};

export default DirectoryDetailProfile;
