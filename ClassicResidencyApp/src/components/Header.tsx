import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, ICONS, SIZES} from '../resources';
import {useNavigation} from '@react-navigation/native';
// import Icon, {Icons} from './Icons';

interface HeaderProps {
  title: string;
  rightIconType?: 'EDIT' | 'FILTER' | 'CREATE' | 'CANCEL' | 'NONE';
  iconPress?: () => void;
  hideBackIcon?: boolean;
}
const Header = (props: HeaderProps) => {
  const navigation = useNavigation();

  const getIcon = () => {
    return (
      <>
        {props.rightIconType == 'EDIT' && (
          <TouchableOpacity onPress={props.iconPress}>
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.white,
                marginRight: 10,
              }}
              source={ICONS.EDIT_ICON}
            />
          </TouchableOpacity>
        )}
        {props.rightIconType == 'FILTER' && (
          <TouchableOpacity onPress={props.iconPress}>
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.white,
                marginRight: 10,
              }}
              source={ICONS.FILTER_ICON}
            />
          </TouchableOpacity>
        )}
        {props.rightIconType == 'CREATE' && (
          <TouchableOpacity onPress={props.iconPress}>
            <Image
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.white,
                marginRight: 5,
              }}
              source={ICONS.ADD_ICON}
            />
          </TouchableOpacity>
        )}
        {props.rightIconType == 'CANCEL' && (
          <TouchableOpacity onPress={props.iconPress}>
            <Image
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.white,
                marginRight: 5,
              }}
              source={ICONS.CANCEL_ICON}
            />
          </TouchableOpacity>
        )}
        {props.rightIconType == 'NONE' && (
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: 'transparent',
            }}></View>
        )}
      </>
    );
  };
  return (
    <View style={{}}>
      <View style={styles.header}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.headerSecond]}
          style={{flex: 1}}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          locations={[0, 0.8]}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop:
                Platform.OS == 'ios' ? (SIZES.height > 812 ? 50 : 30) : 30,
              //   marginTop: 20,
              paddingHorizontal: 10,
              paddingBottom: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) navigation.goBack();
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}> */}
            {!props?.hideBackIcon ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: COLORS.white,
                  }}
                  source={ICONS.BACKWARD_ICON}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: 'transparent',
                }}></View>
            )}
            {/* </TouchableOpacity> */}

            <Text style={[styles.headerTitle]}>{props.title}</Text>

            {props.rightIconType && <>{getIcon()}</>}
          </View>
        </LinearGradient>
      </View>
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
              justifyContent: 'space-between',
            }}></View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  profilePicture: {
    alignSelf: 'center',
    width: 150,
    marginTop: '10%',
    height: 150,
    backgroundColor: COLORS.lightGray,
    borderRadius: 75,
    zIndex: 1,
    marginBottom: '-25%',
  },
});
