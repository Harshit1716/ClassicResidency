import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Modal,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  AlertButton,
  BackHandler,
  Platform,
} from 'react-native';
import {COLORS, FONTS, ICONS, SIZES} from '../resources';
import ProfileTextInput from './ProfileTextInput';
// import Icon, {Icons} from './Icons';
import {SHADOW, SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';
import ImageCropPicker from 'react-native-image-crop-picker';
import AppButton from './AppButton';
import CustomBtn from './CustomBtn';
import UploadImageModal from './UploadImageModal';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {createMember, createNotice} from '../stateManagemer/slice/ServiceSlice';
import SelectCategoryModal from './SelectCategoryModal';

const CreateMemberModal = ({isVisible, onClose, type}: any) => {
  const [title, setTitle] = useState('');
  const [description, setDecsription] = useState('');
  const [subject, setSubject] = useState('');
  const [designation, setDesignation] = useState('');

  const [open, setOpen] = useState(false);
  const [isDesignation, setIsDesignation] = useState(false);
  const [openCatrgory, setOpenCategory] = useState(false);
  const [imageFile, setImageFile] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userReducer.id);

  useEffect(() => {
    if (description == 'AOA') {
      setIsDesignation(true);
    } else {
      setIsDesignation(false);
      setDesignation('');
    }
  }, [description]);
  const header = () => {
    return (
      <View style={{}}>
        <View style={styles.headerContainer}>
          <View style={{...styles.headingContainer}}>
            <Text style={styles.headerTitle}>Add Member</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              backgroundColor: COLORS.primary,
              ...SHADOW,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={onClose}>
            {/* <Icon
              type={Icons.FontAwesome}
              name={'close'}
              color={COLORS.primary}
            /> */}
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.white,
              }}
              source={ICONS.CLOSE_ICON}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.separatorLine} />
      </View>
    );
  };

  function reset() {
    setTitle('');
    setDecsription('');
    setSubject('');
    deleteImage();
  }

  useEffect(() => {
    setDecsription(type);
  }, [type]);
  function handleSubmit() {
    if (validate()) {
      dispatch(
        createMember({
          name: title,
          number: subject,
          type: description,
          designation: designation,
          image: imageFile,
        }),
      );
      onClose();
      reset();
    }
  }

  const SubmitButton = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buyButton}>
          <Text style={styles.buyText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function deleteImage() {
    setImageFile(null);
  }

  const validate = () => {
    const phoneNumberRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    // !phoneNumberRegex.test(number)
    if (title.length == 0 || title.length < 3 || title.length > 25) {
      Alert.alert('Error', 'Please enter a valid title ');
      return false;
    }
    if (subject.length == 0 || !phoneNumberRegex.test(subject)) {
      Alert.alert('Error', 'Please enter a valid phone number ');
      return false;
    }
    if (description.length == 0) {
      Alert.alert('Error', 'Please select a valid member type ');
      return false;
    }
    if (designation.length == 0 && isDesignation) {
      Alert.alert('Error', 'Please select a valid designation  ');
      return false;
    }
    if (imageFile == null || imageFile == undefined) {
      Alert.alert('Error', 'Please upload an Image ');
      return false;
    }
    return true;
  };

  return (
    <Modal
      style={{height: 10}}
      animationType={'slide'}
      transparent={true}
      visible={isVisible}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.popupContainer}>
          {header()}
          <ScrollView>
            <View style={styles.enterDetailsContainer}>
              <Text style={{...FONTS.h3, marginLeft: 25, color: COLORS.gray}}>
                Name
              </Text>
              <ProfileTextInput
                title={title}
                disabled={false}
                onChangeText={text => setTitle(text)}
                placeholder="Title"
              />

              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: 25,
                  color: COLORS.gray,
                  marginTop: 10,
                }}>
                Contact Number
              </Text>
              <ProfileTextInput
                title={subject}
                disabled={false}
                onChangeText={text => setSubject(text)}
                placeholder="Contact Number"
                keybordType="phone"
              />
              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: 20,
                  marginTop: 10,
                  color: COLORS.gray,
                }}>
                Type
              </Text>

              {description || description != '' ? (
                <TouchableOpacity
                  disabled={true}
                  style={{overflow: 'hidden'}}
                  onPress={() => {
                    setOpenCategory(true);
                  }}>
                  <Text
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      ...FONTS.body3,
                      padding: SIZES.spacing * 1.2,
                      backgroundColor: COLORS.lightPrimary,
                      borderRadius: 10,
                      marginVertical: SIZES.spacing,
                      color: COLORS.gray,
                    }}>
                    {description}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{overflow: 'hidden'}}
                  onPress={() => {
                    setOpenCategory(true);
                  }}>
                  <Text
                    style={{
                      width: '90%',
                      alignSelf: 'center',
                      ...FONTS.body3,
                      padding: SIZES.spacing * 1.2,
                      backgroundColor: COLORS.lightPrimary,
                      borderRadius: 10,
                      marginVertical: SIZES.spacing,
                      color: COLORS.gray,
                    }}>
                    {description == '' ? ' Select Type' : description}
                  </Text>
                </TouchableOpacity>
              )}

              {isDesignation && (
                <>
                  <Text
                    style={{
                      ...FONTS.h3,
                      marginLeft: 20,
                      marginTop: 10,
                      color: COLORS.gray,
                    }}>
                    Designation
                  </Text>
                  <ProfileTextInput
                    title={designation}
                    disabled={false}
                    onChangeText={text => setDesignation(text)}
                    placeholder="Designation"
                  />
                </>
              )}
            </View>
            {imageFile == null && (
              <TouchableOpacity
                style={{marginTop: 20}}
                onPress={() => {
                  setOpen(true);
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
                    Upload Image
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {imageFile != null && (
              <View style={{marginTop: 20, alignSelf: 'center'}}>
                <Text style={{...FONTS.h3, marginTop: 10}}>Image</Text>
                <ImageBackground
                  resizeMode="stretch"
                  style={{
                    borderRadius: 20,
                    height: 200,
                    width: SIZES.width * 0.8,
                    marginTop: 30,
                  }}
                  source={{uri: imageFile?.assets?.[0]?.uri + ''}}>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: -20,
                      backgroundColor: COLORS.primary,
                      ...SHADOW,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      marginTop: -30,
                      alignSelf: 'flex-end',
                    }}
                    onPress={() => deleteImage()}>
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
            <SubmitButton />
          </ScrollView>
        </View>
        {open && (
          <UploadImageModal
            isVisible={open}
            onClose={() => setOpen(false)}
            onSelect={setImageFile}
          />
        )}
        {openCatrgory && (
          <SelectCategoryModal
            selected={description}
            isVisible={openCatrgory}
            onClose={() => setOpenCategory(false)}
            onSelect={setDecsription}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateMemberModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
    // paddingTop: 120,
  },
  popupContainer: {
    height: '80%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
  },
  dismissButton: {
    width: 20,
    height: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  headingContainer: {
    alignItems: 'center',
    flex: 1,
  },
  separatorLine: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.lightGray1,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.primary,
    textAlign: 'center',
  },
  stockName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.gray,
    width: '80%',
    textAlign: 'center',
  },
  enterDetailsContainer: {
    // paddingHorizontal: 20,
    paddingTop: 25,
  },

  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 32,
    marginBottom: 20,
  },
  quantityContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 32,
    marginBottom: 5,
  },

  footerContainer: {
    marginTop: 30,
    paddingHorizontal: '5%',
    marginBottom: 50,
    flex: 1,
    width: '100%',
  },

  buyButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buyText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});
