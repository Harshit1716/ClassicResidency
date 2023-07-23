import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
import {SHADOW_PRIMARY, SHADOW_PRIMARY_LIGHT} from '../resources/Theme';
import {useNavigation} from '@react-navigation/native';
import {getAllMembers} from '../stateManagemer/slice/ServiceSlice';
import CreateMemberModal from '../components/CreateMemberModal';

const MemberCategory = () => {
  const isAdmin = useAppSelector(state => state.userReducer.isAdmin);
  const isAOA = useAppSelector(state => state.userReducer.isAdmin);
  const [pressed, setPressed] = useState(-1);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getAllMembers());
  }, []);
  return (
    <View style={{backgroundColor: COLORS.white}}>
      <Header
        title="Members"
        rightIconType={isAOA || isAdmin ? 'CREATE' : 'NONE'}
        iconPress={() => setOpen(true)}
      />
      <View style={{}}>
        <Text
          style={{
            ...FONTS.h2,
            marginVertical: '10%',
            alignSelf: 'center',
            color: COLORS.gray,
          }}>
          Choose Catergory
        </Text>

        <View
          style={{
            flexWrap: 'wrap',
            width: '100%',
          }}>
          <FlatList
            ListFooterComponent={() => (
              <View style={{height: SIZES.height * 0.4}}></View>
            )}
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
            data={[
              {
                title: 'AOA',
                image: ICONS.AOA_ICON,
              },
              {
                title: 'Plumber',
                image: ICONS.PLUMBER_ICON,
              },
              {
                title: 'Electrician',
                image: ICONS.ELECTRICIAN_ICON,
              },
              {
                title: 'Guard',
                image: ICONS.GUARD_ICON,
              },
              {
                title: 'Carpenter',
                image: ICONS.CARPENTER_ICON,
              },
              {
                title: 'Painter',
                image: ICONS.PAINTER_ICON,
              },
              {
                title: 'Lift',
                image: ICONS.ELEVATOR_ICON,
              },
              {
                title: 'Mason',
                image: ICONS.MASON_ICON,
              },
              {
                title: 'HouseHelp',
                image: ICONS.HOUSEKEEPING_ICON,
              },
              {
                title: 'Intercom',
                image: ICONS.INTERCOM_ICON,
              },
              {
                title: 'Gardner',
                image: ICONS.GARDNER_ICON,
              },
              {
                title: 'MainGate',
                image: ICONS.MAIN_GATE_ICON,
              },
            ]}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MembersList', {data: item.title});
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
                    // paddingHorizontal: SIZES.width * 0.09,
                    width: SIZES.width * 0.28,
                    padding: '5%',
                    justifyContent: 'center',
                    marginTop: 10,
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
                      // tintColor: pressed != index ? COLORS.black : COLORS.white,
                    }}
                    source={item.image}
                  />
                  <Text
                    style={{
                      marginTop: 10,

                      ...FONTS.body8,
                      color: pressed != index ? COLORS.black : COLORS.white,
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <CreateMemberModal
        type={''}
        onClose={() => setOpen(false)}
        isVisible={open}
      />
    </View>
  );
};

export default MemberCategory;

const styles = StyleSheet.create({});
