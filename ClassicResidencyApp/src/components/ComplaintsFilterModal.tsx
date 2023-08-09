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
import {getStatusColor} from '../resources/Utils';
import SetStatusModal from './SetStatusModal';
import BlockModal from './BlockModal';
import StatusFilterModal from './StatusFilterModal';
import FilterCategoryModal from './FilterCategoryModal';

const ComplaintsFilterModal = ({isVisible, onClose, onApply}: any) => {
  const [title, setTitle] = useState('');
  const [description, setDecsription] = useState(''); //used for block
  const [status, setStatus] = useState('Pending');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openCatrgory, setOpenCategory] = useState(false);

  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userReducer.id);

  const header = () => {
    return (
      <View style={{}}>
        <View style={styles.headerContainer}>
          <View style={{marginRight: -40, ...styles.headingContainer}}>
            <Text style={styles.headerTitle}>Filter</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              backgroundColor: COLORS.white,
              ...SHADOW,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: -50,
              right: -20,
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
    onApply('', '', '');
    onClose();
  }

  function handleSubmit() {
    onApply(
      status == 'None' ? '' : status,
      title == 'All' ? '' : title,
      description == 'None' ? '' : description,
    );
    onClose();
  }

  const SubmitButton = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buyButton}>
          <Text style={styles.buyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const ResetButton = () => {
    return (
      <View
        style={{
          marginBottom: 30,
          paddingHorizontal: '5%',
          flex: 1,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={reset}
          style={[styles.buyButton, {backgroundColor: 'gray'}]}>
          <Text style={[styles.buyText]}>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const statusButton = () => {
    return (
      <View
        style={{
          // paddingHorizontal: '5%',
          flex: 1,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            width: '90%',
            overflow: 'hidden',
            ...FONTS.body3,
            padding: 8,
            backgroundColor: getStatusColor(status ?? 'Pending'),
            borderRadius: 5,
            marginVertical: SIZES.spacing,
          }}
          disabled={false}
          onPress={() => {
            // if (editable) {
            setOpen(true);
            // }
          }}>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.body4,

              color: COLORS.white,
            }}>
            {status}
          </Text>
        </TouchableOpacity>
      </View>
    );
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
              <Text
                style={{
                  ...FONTS.h3,
                  marginLeft: 20,
                  marginTop: 10,
                  color: COLORS.gray,
                }}>
                Block
              </Text>

              {title || title != '' ? (
                <TouchableOpacity
                  disabled={false}
                  style={{overflow: 'hidden'}}
                  onPress={() => {
                    setOpen2(true);
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
                    {title}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{overflow: 'hidden'}}
                  onPress={() => {
                    setOpen2(true);
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
                    {title == '' ? ' Select Block' : title}
                  </Text>
                </TouchableOpacity>
              )}

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
                  disabled={false}
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h3,
                  marginLeft: 20,
                  color: COLORS.gray,
                }}>
                Status :
              </Text>
              {statusButton()}
            </View>

            <SubmitButton />
            <ResetButton />
          </ScrollView>
        </View>

        {openCatrgory && (
          <FilterCategoryModal
            selected={description}
            isVisible={openCatrgory}
            onClose={() => setOpenCategory(false)}
            onSelect={setDecsription}
          />
        )}
        {open2 && (
          <BlockModal
            selected={title}
            isVisible={open2}
            onClose={() => setOpen2(false)}
            onSelect={setTitle}
          />
        )}
        {open && (
          <StatusFilterModal
            isVisible={open}
            onClose={() => {
              setOpen(false);
            }}
            onSelect={txt => {
              setStatus(txt);
              setOpen(false);
            }}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ComplaintsFilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  popupContainer: {
    height: '70%',
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
    marginVertical: 30,
    paddingHorizontal: '5%',
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
