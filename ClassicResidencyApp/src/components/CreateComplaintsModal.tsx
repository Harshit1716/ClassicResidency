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
import {
  createComplaint,
  createNotice,
} from '../stateManagemer/slice/ServiceSlice';
import SelectCategoryModal from './SelectCategoryModal';

const CreateComplaintsModal = ({isVisible, onClose}: any) => {
  const [title, setTitle] = useState('');
  const [description, setDecsription] = useState('');
  const [subject, setSubject] = useState('');

  const [open, setOpen] = useState(false);
  const [openCatrgory, setOpenCategory] = useState(false);
  const [imageFile, setImageFile] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userReducer);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipPress = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(
        selectedChips.filter(selectedChip => selectedChip !== chip),
      );
    } else {
      if (selectedChips.length < 2) {
        setSelectedChips([...selectedChips, chip]);
      } else {
        Alert.alert('Error', 'You can only select two slots');
      }
    }
  };

  const chips = [
    'Morning (Before 12 PM)',
    'Afternoon (12-4 PM)',
    'Evening (After 4 PM)',
    'Anytime',
  ];

  const header = () => {
    return (
      <View style={{}}>
        <View style={styles.headerContainer}>
          <View style={{marginRight: -40, ...styles.headingContainer}}>
            <Text style={styles.headerTitle}>Create Complaints</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.white,
              ...SHADOW,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: -50,
            }}
            onPress={onClose}>
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

  function handleSubmit() {
    if (validate()) {
      dispatch(
        createComplaint({
          title: title,
          des: description,
          type: subject,
          image: imageFile,
          slots: selectedChips,
          user: user.id,
          flatNo: user.block + '-' + user.flatType + '' + user.flatNumber,
          by:
            user.currentUser === user.phoneNumber
              ? user.ownerName
              : user?.tenantName ?? '',
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
    if (title.length == 0 || title.length < 3) {
      Alert.alert('Error', 'Please enter a valid title ');
      return false;
    }
    if (description.length == 0 || description.length < 10) {
      Alert.alert('Error', 'Please select a valid Description ');
      return false;
    }
    if (subject.length == 0) {
      Alert.alert('Error', 'Please enter a valid Type ');
      return false;
    }
    if (selectedChips.length == 0) {
      Alert.alert('Error', 'Please select a preffered slot ');
      return false;
    }
    // if (imageFile == null) {
    //   Alert.alert('Error', 'Please upload a an image');
    //   return false;
    // }
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
              <Text style={{...FONTS.h3, marginLeft: 25}}>Title</Text>
              <ProfileTextInput
                title={title}
                disabled={false}
                onChangeText={text => setTitle(text)}
                placeholder="Title"
              />

              <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>
                Description
              </Text>
              <ProfileTextInput
                textArea={true}
                title={description}
                disabled={false}
                onChangeText={text => setDecsription(text)}
                placeholder="Description"
              />

              <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
                Type
              </Text>
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
                  {subject == '' ? ' Select Type' : subject}
                </Text>
              </TouchableOpacity>
              <Text style={{...FONTS.h3, marginLeft: 25, marginTop: 10}}>
                Preferred Slots
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginHorizontal: 16,
                  marginVertical: 8,
                }}>
                {chips.map((chip, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleChipPress(chip)}
                    style={[
                      {
                        // backgroundColor: '#e0e0e0',
                        backgroundColor: COLORS.white,
                        borderRadius: 20,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        margin: 4,
                        ...SHADOW,
                        borderWidth: 0.5,
                        borderColor: COLORS.lightGray,
                      },
                      selectedChips.includes(chip) && {
                        backgroundColor: COLORS.primary,
                      },
                    ]}>
                    <Text
                      style={{
                        color: selectedChips.includes(chip)
                          ? COLORS.white
                          : 'black',
                        fontSize: 14,
                      }}>
                      {chip}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
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
                  source={{uri: imageFile.path + ''}}>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: -20,
                      backgroundColor: 'red',
                      ...SHADOW,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      marginTop: -30,
                      alignSelf: 'flex-end',
                    }}
                    onPress={() => deleteImage()}>
                    {/* <Icon
                      type={Icons.FontAwesome}
                      name={'close'}
                      color={COLORS.white}
                    /> */}
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
            onSelect={setSubject}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateComplaintsModal;

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
