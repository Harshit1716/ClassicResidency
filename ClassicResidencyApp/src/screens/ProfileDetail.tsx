import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
import Header from '../components/Header';
import {SHADOW_PRIMARY} from '../resources/Theme';
import AppTextInput from '../components/AppTextInput';
import ProfileTextInput from '../components/ProfileTextInput';
import AppButton from '../components/AppButton';
import ProfileModal from '../components/AddProfileModal';

const ProfileDetail = () => {
  const [open, setOpen] = useState(false);
  return (
    <View style={{flex: 1}}>
      <Header
        iconPress={() => Alert.alert('Pressed')}
        title="Profile"
        rightIconType="EDIT"
      />
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.primary, '#396afc']}
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
          <Text style={{...FONTS.h3, marginLeft: 20}}>Name</Text>
          <ProfileTextInput
            title="Email"
            disabled={false}
            onChangeText={text => console.log(text)}
            placeholder="Email"
          />
          <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
            Email
          </Text>
          <ProfileTextInput
            title="UserName"
            disabled={true}
            onChangeText={text => console.log(text)}
            placeholder="UserName"
          />
        </View>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{
            width: '60%',
            padding: '3%',
            // backgroundColor: COLORS.white,
            alignSelf: 'center',

            borderRadius: 40,
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
            ADD TENANT
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
          //   marginTop: '25%',
          marginTop: Platform.OS == 'ios' ? (SIZES.height > 812 ? 65 : 65) : 90,
        }}>
        <Image source={ICONS.PROFILE_ICON} style={styles.profilePicture} />
      </View>
      <ProfileModal
        isVisible={open}
        onClose={() => setOpen(false)}
        // user={{name: 'harry', email: 'asdada', bio: 'asdsad'}}
      />
    </View>
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
    width: SIZES.height > 812 ? 150 : 120,
    marginTop: '10%',
    height: SIZES.height > 812 ? 150 : 120,
    backgroundColor: COLORS.lightGray,
    borderRadius: 75,
    zIndex: 1,
    marginBottom: '-25%',
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
