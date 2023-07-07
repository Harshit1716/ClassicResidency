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
import Icon, {Icons} from './Icons';
import {SHADOW, SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';

let isBuyOrder: boolean = false;

const CreateNoticeModal = ({isVisible, onClose}: any) => {
  const [title, setTitle] = useState('');
  const [description, setDecsription] = useState('');
  const [subject, setSubject] = useState('');
  const [image, setImage] = useState(false);
  const header = () => {
    return (
      <View style={{}}>
        <View style={styles.headerContainer}>
          <View style={{marginRight: -40, ...styles.headingContainer}}>
            <Text style={styles.headerTitle}>Create Notice</Text>
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
            <Icon
              type={Icons.FontAwesome}
              name={'close'}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.separatorLine} />
      </View>
    );
  };

  const SubmitButton = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.buyButton}>
          <Text style={styles.buyText}>{true ? 'ADD' : 'SELL'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function deleteImage() {
    setImage(false);
  }
  function addImage() {
    setImage(true);
  }

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
              <Text style={{...FONTS.h3, marginLeft: 20}}>Title</Text>
              <ProfileTextInput
                title={title}
                disabled={false}
                onChangeText={text => setTitle(text)}
                placeholder="Title"
              />

              <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
                Subject
              </Text>
              <ProfileTextInput
                title={subject}
                disabled={false}
                onChangeText={text => setSubject(text)}
                placeholder="Subject"
              />
              <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
                Subject
              </Text>
              <ProfileTextInput
                textArea={true}
                title={subject}
                disabled={false}
                onChangeText={text => setSubject(text)}
                placeholder="Subject"
              />
            </View>
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => {
                addImage();
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
            {image && (
              <View style={{marginTop: 20, alignSelf: 'center'}}>
                <ImageBackground
                  style={{
                    borderRadius: 20,
                    height: 120,
                    width: 200,
                    marginTop: 30,
                  }}
                  source={ICONS.BANNER_ICON}>
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
                    <Icon
                      type={Icons.FontAwesome}
                      name={'close'}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}
            <SubmitButton />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateNoticeModal;

const radiusStyle = {
  borderWidth: 1,
  borderColor: COLORS.lightGray1,
  borderRadius: 5,
};

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
  selectAccountHeader: {
    color: COLORS.gray,
    marginBottom: 5,
    ...FONTS.h2,
  },
  selectAccountContainer: {
    marginBottom: 15,
  },
  selectExpiryContainer: {
    marginBottom: 10,
  },
  selectAccountButton: {
    width: '100%',
    padding: 10,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...radiusStyle,
  },
  selectAccountButtonOpacity: {
    width: '100%',
    padding: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...radiusStyle,
  },
  selectedAccountText: {
    flexShrink: 1,
    marginRight: 10,
    color: COLORS.gray,
    ...FONTS.body5,
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
  priceToggleView: {
    flexDirection: 'row',
    width: '100%',
    marginRight: 15,
  },
  priceButtons: {
    flex: 1,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    ...radiusStyle,
  },
  quantityText: {
    ...FONTS.h4,
  },
  priceInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
    ...radiusStyle,
  },
  currencyView: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    height: '100%',
  },
  currencyText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  priceInput: {
    flex: 1,
    paddingLeft: 5,
    paddingVertical: 5,
    color: COLORS.black,
  },
  quantityInput: {
    flex: 1,
    paddingLeft: 5,
    paddingVertical: 5,
    color: COLORS.black,
  },
  accInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quantityAmountView: {
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
  accBalanceContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  estAmountContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  estAmountText: {
    ...FONTS.h5,
    color: COLORS.gray,
    flexShrink: 13,
  },
  footerContainer: {
    marginTop: 30,
    paddingHorizontal: '10%',
    marginBottom: 50,
    flex: 1,
    width: '100%',
  },
  orderDetailsContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: COLORS.lightGray,
    ...radiusStyle,
    marginBottom: 25,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  buyButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    borderRadius: 20,
  },
  buyText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  orderDetailsLeftText: {
    ...FONTS.h5,
    color: COLORS.gray,
    marginRight: 20,
    flex: 1.6,
  },
  orderDetailsRightText: {
    ...FONTS.h4,
    color: COLORS.gray,
    flex: 1.4,
    flexShrink: 1,
    textAlign: 'right',
  },
});
