import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {useAppSelector} from '../stateManagemer/Store';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
import {SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';
import {useNavigation} from '@react-navigation/native';

const MemberCategory = () => {
  const isAdmin = useAppSelector(state => state.userReducer.isAdmin);
  const [pressed, setPressed] = useState(-1);
  const navigation = useNavigation();
  return (
    <View>
      <Header title="Members" rightIconType={isAdmin ? 'CREATE' : 'NONE'} />
      <View style={{}}>
        <Text style={{...FONTS.h2, marginVertical: '10%', alignSelf: 'center'}}>
          Choose Catergory
        </Text>

        <View
          style={{
            flexWrap: 'wrap',
            width: '100%',
          }}>
          <FlatList
            style={{
              height: SIZES.height,
              alignSelf: 'center',
              width: '100%',
            }}
            bounces={false}
            numColumns={3}
            contentContainerStyle={{
              justifyContent: 'space-evenly',
              paddingHorizontal: '1%',
            }}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MembersList');
                  }}
                  onPressIn={() => {
                    setPressed(index);
                  }}
                  onPressOut={() => {
                    setPressed(-1);
                  }}
                  style={{
                    backgroundColor:
                      pressed == index ? COLORS.primary : COLORS.white,
                    paddingVertical: '7%',
                    paddingHorizontal: SIZES.width * 0.09,
                    justifyContent: 'center',
                    marginHorizontal: SIZES.width * 0.02,
                    alignItems: 'center',
                    marginBottom: '10%',
                    borderRadius: 10,
                    ...SHADOW_PRIMARY_LIGHT,
                  }}>
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      tintColor: pressed != index ? COLORS.black : COLORS.white,
                    }}
                    source={ICONS.MEMBERS_ICON}
                  />
                  <Text
                    style={{
                      marginTop: 10,
                      ...FONTS.body3,
                      color: pressed != index ? COLORS.black : COLORS.white,
                    }}>
                    Title
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MemberCategory;

const styles = StyleSheet.create({});
