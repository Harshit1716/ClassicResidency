import {
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import ProfileTextInput from '../components/ProfileTextInput';
import {uploadImageToFirebase} from '../resources/Utils';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {Ads} from '../stateManagemer/models/SocietyAppModal';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

const CreateAddScreen = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [address, setAddress] = useState('');

  const navigation = useNavigation();

  const [editable, setEditable] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [imageFile, setImageFile] = React.useState<any>(null);
  const [imageFile2, setImageFile2] = React.useState<any>(null);
  const [imageFileBanner, setImageFileBanner] = React.useState<any>(null);
  const adsList = useAppSelector(state => state.userReducer.adsList);

  const dispatch = useAppDispatch();
  function deleteImage(type: string) {
    if (type == 'img1') {
      setImageFile(null);
    }
    if (type == 'img2') {
      setImageFile2(null);
    }
    if (type == 'banner') {
      setImageFileBanner(null);
    }
  }
  const validate = () => {
    if (name.length == 0 || name.length < 3) {
      Alert.alert('Error', 'Please enter a valid title ');
      return false;
    }
    if (address.length == 0 || address.length < 10) {
      Alert.alert('Error', 'Please select a valid Description ');
      return false;
    }
    if (text1.length == 0) {
      Alert.alert('Error', 'Please enter a valid Type ');
      return false;
    }
    if (imageFile == null || imageFile == undefined) {
      Alert.alert('Error', 'Please upload a image1 ');
      return false;
    }
    if (imageFileBanner == null || imageFileBanner == undefined) {
      Alert.alert('Error', 'Please upload a image1 ');
      return false;
    }

    return true;
  };

  const handleAddAds = async () => {
    if (true) {
      setloading(true);
      try {
        let imageurl = '';
        if (imageFile)
          imageurl = (await uploadImageToFirebase(imageFile)) ?? '';
        let imageurl2 = '';
        if (imageFile)
          imageurl2 = (await uploadImageToFirebase(imageFile2)) ?? '';
        let imageurlBanner = '';
        if (imageFileBanner)
          imageurlBanner = (await uploadImageToFirebase(imageFileBanner)) ?? '';

        if (imageurl != '' && imageurlBanner != '') {
          const noticeData: Ads = {
            id: name + Date.now(),
            name: name,
            address: address,
            text1: text1,
            text2: text2,
            img1: imageurl,
            img2: imageurl2,
            banner: imageurlBanner,
            number: phoneNo,
            createdAt: new Date().toLocaleDateString(),
          };

          const noticesCollectionRef = firestore()
            .collection('Ads')
            .doc(name + Date.now());
          await noticesCollectionRef.set(noticeData);
        }

        setloading(false);
        navigation.goBack();
      } catch (error) {
        console.log(error);
        setloading(false);
        return Alert.alert(error?.message);
      }
    }
  };
  const handleAddBanner = async () => {
    console.log(adsList[0], 'Here');
    const noticeData: Ads = {
      id: adsList[1].name + Date.now(),
      name: adsList[1].name,
      address: adsList[1].address,
      text1: adsList[1].text1,
      text2: adsList[1].text2,
      img1: adsList[1].img1,
      img2: adsList[1].img2,
      banner: adsList[1].banner,
      number: adsList[1].number,
      createdAt: new Date().toLocaleDateString(),
    };

    const noticesCollectionRef = firestore()
      .collection('Banners')
      .doc(name + Date.now());
    await noticesCollectionRef.set(noticeData);
    // adsList.map(async item => {
    //   console.log(item, 'Here');
    //   //   const noticeData: Ads = {
    //   //     id: item.name + Date.now(),
    //   //     name: item.name,
    //   //     address: item.address,
    //   //     text1: item.text1,
    //   //     text2: item.text2,
    //   //     img1: item.img1,
    //   //     img2: item.img2,
    //   //     banner: item.banner,
    //   //     number: item.number,
    //   //     createdAt: new Date().toLocaleDateString(),
    //   //   };

    //   //   const noticesCollectionRef = firestore()
    //   //     .collection('Banners')
    //   //     .doc(name + Date.now());
    //   //   await noticesCollectionRef.set(noticeData);
    // });
  };

  const SubmitButton = () => {
    return (
      <TouchableOpacity
        onPress={async () => {
          handleAddBanner();
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
          Upload
        </Text>
      </TouchableOpacity>
    );
  };

  const renderImageComponen = (img: string, type: string) => {
    return (
      <>
        {img == null && (
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => {
              if (type == 'img1') {
                setOpen(true);
              }
              if (type == 'img2') {
                setOpen2(true);
              }
              if (type == 'banner') {
                setOpen3(true);
              }
            }}>
            <View
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: COLORS.primary,
                backgroundColor: 'transparent',
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: COLORS.primary,
                  paddingVertical: 12,
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'Poppins',
                }}>
                Upload Image (Optional) {type}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {img != null && (
          <View style={{marginTop: 20, alignSelf: 'center'}}>
            <Text style={{...FONTS.h3, marginTop: 10}}>{type}</Text>
            <ImageBackground
              resizeMode="stretch"
              style={{
                borderRadius: 20,
                height: 200,
                width: SIZES.width * 0.8,
                marginTop: 30,
              }}
              source={{uri: img?.assets?.[0]?.uri + ''}}>
              <TouchableOpacity
                style={{
                  width: 45,
                  height: 45,
                  marginRight: -20,
                  backgroundColor: COLORS.primary,
                  ...SHADOW,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  marginTop: -30,
                  alignSelf: 'flex-end',
                }}
                onPress={() => deleteImage(type)}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.white,
                  }}
                  source={ICONS.CLOSE_ICON}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
      </>
    );
  };
  return (
    <MainView style={{flex: 1}}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <Header
        iconPress={() => {
          //   if (editable == false) setEditable(true);
          //   else if (editable == true) {
          //     setImageFile(null);
          //     setEditable(false);
          //   }
        }}
        title="Create Add"
        rightIconType={editable ? 'NONE' : 'NONE'}
      />

      <ScrollView>
        <View style={{paddingVertical: '5%'}}>
          <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>Name</Text>
          <ProfileTextInput
            textArea={false}
            title={name}
            disabled={false}
            onChangeText={text => setName(text)}
            placeholder="Name"
          />
          <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>
            Address
          </Text>
          <ProfileTextInput
            textArea={true}
            title={address}
            disabled={false}
            onChangeText={text => setAddress(text)}
            placeholder="Address"
          />
          <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>
            Text 1
          </Text>
          <ProfileTextInput
            textArea={true}
            title={text1}
            disabled={false}
            onChangeText={text => setText1(text)}
            placeholder="Description"
          />
          <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>
            Text 2
          </Text>
          <ProfileTextInput
            textArea={true}
            title={text2}
            disabled={false}
            onChangeText={text => setText2(text)}
            placeholder="Description"
          />
          <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>
            Contact number
          </Text>
          <ProfileTextInput
            textArea={false}
            title={phoneNo}
            disabled={false}
            onChangeText={text => setPhoneNo(text)}
            placeholder="Description"
          />
        </View>
        {renderImageComponen(imageFileBanner, 'banner')}
        {renderImageComponen(imageFile, 'img1')}
        {renderImageComponen(imageFile2, 'img2')}

        <View style={{height: SIZES.height * 0.2}}></View>
      </ScrollView>
      {loading && <Loader />}
      {open && (
        <UploadImageModal
          isVisible={open}
          onClose={() => setOpen(false)}
          onSelect={setImageFile}
        />
      )}
      {open2 && (
        <UploadImageModal
          isVisible={open2}
          onClose={() => setOpen2(false)}
          onSelect={setImageFile2}
        />
      )}
      {open3 && (
        <UploadImageModal
          isVisible={open3}
          onClose={() => setOpen3(false)}
          onSelect={setImageFileBanner}
        />
      )}
      {SubmitButton()}
    </MainView>
  );
};

export default CreateAddScreen;

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
