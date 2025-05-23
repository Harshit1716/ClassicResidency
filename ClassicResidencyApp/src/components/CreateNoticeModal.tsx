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
import {createNotice} from '../stateManagemer/slice/ServiceSlice';

const CreateNoticeModal = ({isVisible, onClose}: any) => {
  const [title, setTitle] = useState('');
  const [description, setDecsription] = useState('');
  const [subject, setSubject] = useState('');

  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userReducer.id);

  const header = () => {
    return (
      <View style={{}}>
        <View style={styles.headerContainer}>
          <View style={{...styles.headingContainer}}>
            <Text style={styles.headerTitle}>Create Notice</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.primary,
              ...SHADOW,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => {
              reset();
              onClose();
            }}>
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

  function handleSubmit() {
    if (validate()) {
      dispatch(
        createNotice({
          title: title,
          des: description,
          subject: subject,
          image: imageFile,
          user: userId,
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
          <Text style={styles.buyText}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function deleteImage() {
    setImageFile(null);
  }

  const validate = () => {
    if (title.length == 0 || title.length < 3 || title.length > 25) {
      Alert.alert('Error', 'Please enter a valid title ');
      return false;
    }
    if (subject.length == 0 || subject.length < 3) {
      Alert.alert('Error', 'Please enter a valid subject ');
      return false;
    }
    if (description.length == 0 || description.length < 5) {
      Alert.alert('Error', 'Please enter a valid Description ');
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
              <Text style={{...FONTS.h3, marginLeft: 20, color: COLORS.gray}}>
                Title
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
                  marginLeft: 20,
                  color: COLORS.gray,
                  marginTop: 10,
                }}>
                Subject
              </Text>
              <ProfileTextInput
                title={subject}
                disabled={false}
                onChangeText={text => setSubject(text)}
                placeholder="Subject"
              />
              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: 20,
                  marginTop: 10,
                  color: COLORS.gray,
                }}>
                Description
              </Text>
              <ProfileTextInput
                textArea={true}
                title={description}
                disabled={false}
                onChangeText={text => setDecsription(text)}
                placeholder="Description"
              />
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
                    Upload Image (Optional)
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
                      backgroundColor: COLORS.white,
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
                        tintColor: COLORS.primary,
                      }}
                      source={ICONS.CLOSE_ICON}
                    />
                    {/* <Icon
                      type={Icons.FontAwesome}
                      name={'close'}
                      color={COLORS.primary}
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
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateNoticeModal;

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
    paddingVertical: 20,
    borderRadius: 10,
  },
  buyText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});
