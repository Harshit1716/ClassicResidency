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
  rightIconType?: 'EDIT' | 'FILTER' | 'CREATE' | 'NONE';
  iconPress?: () => void;
  hideBackIcon?: boolean;
}
const Header = (props: HeaderProps) => {
  const navigation = useNavigation();

  const getIcon = () => {
    return <></>;
    // return (
    //   <>
    //     {props.rightIconType == 'EDIT' && (
    //       <TouchableOpacity onPress={props.iconPress}>
    //         <Icon
    //           type={Icons.MaterialIcons}
    //           name={'edit'}
    //           color={COLORS.white}
    //         />
    //       </TouchableOpacity>
    //     )}
    //     {props.rightIconType == 'FILTER' && (
    //       <TouchableOpacity onPress={props.iconPress}>
    //         <Icon
    //           type={Icons.MaterialCommunityIcons}
    //           name={'filter'}
    //           color={COLORS.white}
    //         />
    //       </TouchableOpacity>
    //     )}
    //     {props.rightIconType == 'CREATE' && (
    //       <TouchableOpacity onPress={props.iconPress}>
    //         <Icon
    //           size={40}
    //           type={Icons.Ionicons}
    //           name={'add'}
    //           color={COLORS.white}
    //         />
    //       </TouchableOpacity>
    //     )}
    //     {props.rightIconType == 'NONE' && (
    //       <View
    //         style={{
    //           height: 30,
    //           width: 30,
    //           backgroundColor: 'transparent',
    //         }}></View>
    //     )}
    //   </>
    // );
  };
  return (
    <View style={{}}>
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
                {/* <Icon
                  type={Icons.FontAwesome}
                  name={'backward'}
                  color={COLORS.white}
                /> */}
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
