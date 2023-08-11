import {View, Text, FlatList, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import MainView from '../components/MainView';
import Header from '../components/Header';
import {COLORS, ICONS} from '../resources';
import {FONTS, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';
import {Image} from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import Loader from '../components/Loader';

const DirectoryList = () => {
  const list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'SH'];
  const navigation = useNavigation();
  return (
    <MainView>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Header title="Directory" rightIconType="NONE" />
      <FlatList
        data={list}
        ListFooterComponent={() => <View style={{height: 100}}></View>}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('BlockList', {block: item});
              }}
              style={{
                marginHorizontal: '5%',
                marginTop: '5%',
                backgroundColor: COLORS.lightPrimary,
                borderRadius: 10,
                ...SHADOW_PRIMARY_LIGHT,
                flexDirection: 'row',
                padding: '5%',
              }}>
              <Text style={{...FONTS.h3, flex: 1, color: COLORS.gray}}>
                BLock : {item}
              </Text>
              <Image source={ICONS.FORWARD_ICON} />
            </TouchableOpacity>
          );
        }}
      />
    </MainView>
  );
};

export default DirectoryList;
