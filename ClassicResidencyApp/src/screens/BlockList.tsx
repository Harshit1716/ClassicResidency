import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatType} from '../stateManagemer/models/SocietyAppModal';
import {COLORS, ICONS} from '../resources';
import {FONTS, SHADOW, SHADOW_PRIMARY_LIGHT, SIZES} from '../resources/Theme';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Loader from '../components/Loader';
import NoDataFound from '../components/NoDataFound';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-animatable';
import {useAppSelector} from '../stateManagemer/Store';
const BlockList = (props: any) => {
  const [input, setInput] = useState('');
  const [flag, setFlag] = useState(false);
  const [list, setList] = useState<FlatType[]>([]);
  const [block, setBlock] = useState('');
  const navigation = useNavigation();
  const isLoading = useAppSelector(item => item.userReducer.loading);
  const fetchGetAllFlats = async () => {
    const complaintsRef = firestore().collection('Users');
    const snapshot = await complaintsRef.get();
    const users: FlatType[] = snapshot.docs.map(doc => doc.data() as FlatType);
    let ar = users.filter(item => item.block == block);
    // ar = ar.filter(item => item.flatType != 'AOA');
    console.log(ar);
    setList(ar);
    setFlag(false);
  };
  useEffect(() => {
    setBlock(props?.route?.params.block);
  }, [props?.route?.params]);
  useEffect(() => {
    setFlag(true);
    fetchGetAllFlats();
  }, [block]);

  const renderBlockListComponent = () => {
    return (
      <>
        {list.length > 0 ? (
          <FlatList
            style={{
              height: SIZES.height,
              marginTop: 20,
              backgroundColor: COLORS.white,
            }}
            data={list}
            renderItem={({item}) => {
              return (
                <>
                  {/* {item.flatType != 'AOA' ? ( */}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DirectoryDetailProfile', {
                        block: item,
                      });
                    }}
                    style={{
                      marginHorizontal: '5%',
                      marginVertical: '2%',
                      backgroundColor: COLORS.lightPrimary,
                      borderRadius: 10,
                      ...SHADOW,
                      flexDirection: 'row',
                      padding: '5%',
                    }}>
                    <Text style={{...FONTS.h3, flex: 1, color: COLORS.gray}}>
                      Flat No : {`${item.flatType}-${item.flatNumber}`}
                    </Text>
                    <Image source={ICONS.FORWARD_ICON} />
                  </TouchableOpacity>
                  {/* ) : (
                    <></>
                  )} */}
                </>
              );
            }}
          />
        ) : (
          <NoDataFound />
        )}
      </>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        height: SIZES.height,
        width: SIZES.width,
        backgroundColor: COLORS.white,
      }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Header title={'Block - ' + block} rightIconType="NONE" />
      {!isLoading && renderBlockListComponent()}
      {flag && <Loader />}
    </View>
  );
};

export default BlockList;

const styles = StyleSheet.create({});
