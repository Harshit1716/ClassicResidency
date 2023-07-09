import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {useAppSelector} from '../stateManagemer/Store';
import {useNavigation} from '@react-navigation/native';
import Loader from './Loader';

interface MainViewTypes {
  style?: any;
  isVisible: boolean;
}

const MainView = (props: any) => {
  const navigation = useNavigation();
  const isLoading = useAppSelector(state => state.userReducer.loading);
  return (
    <View style={styles.container}>
      {/* <ScrollView bounces={false} showsVerticalScrollIndicator={false}> */}
      <StatusBar barStyle="light-content" backgroundColor={COLORS.white} />

      <View style={{flex: 1}}>{props.children}</View>
      {/* </ScrollView> */}
      {isLoading && <Loader />}
    </View>
  );
};

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: COLORS.white,
  },
  loginBtn: {
    padding: 10,
    width: '80%',
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
});
