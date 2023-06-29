import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {useAppSelector} from '../stateManagemer/Store';
import {useNavigation} from '@react-navigation/native';

interface MainViewTypes {
  style?: any;
  isVisible: boolean;
}

const MainView = (props: any) => {
  const navigation = useNavigation();
  //   const isLoading = useAppSelector(state => state.userReducer.loading);
  return (
    <View style={styles.container}>
      {props.children}
      {false && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            paddingTop: SIZES.height * 0.55,
            paddingLeft: SIZES.width * 0.45,
          }}>
          <ActivityIndicator
            style={{alignSelf: 'center'}}
            size={'large'}
            color={COLORS.primary}
          />
        </View>
      )}
    </View>
  );
};

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SIZES.height,
    width: SIZES.width,

    // backgroundColor: 'red',
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
