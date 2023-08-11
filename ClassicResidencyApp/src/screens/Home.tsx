import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';

import {ICONS, COLORS, SIZES} from '../resources';
import MainView from '../components/MainView';
import {FONTS, SHADOW, SHADOW_PRIMARY} from '../resources/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Banner from '../components/Banners';
// import Icon, {Icons} from '../components/Icons';
import SearchBar from '../components/SearchBar';
import {useAppDispatch, useAppSelector} from '../stateManagemer/Store';
import {
  getAllComplaints,
  getAllMembers,
  getAllNotice,
  getComplaintsById,
} from '../stateManagemer/slice/ServiceSlice';
import {Notice} from '../stateManagemer/models/SocietyAppModal';
import NoticeCard from '../components/NoticeCard';
import ChangePasswordModal from '../components/ChangePasswordModal';
const {width} = Dimensions.get('screen');
const places = [
  {
    id: '1',
    name: 'Lago di Braies, Braies',
    location: 'Italy',
    image: ICONS.BANNER_ICON,
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '2',
    name: 'Siargao island',
    location: 'Philippines',
    image: ICONS.BANNER_ICON2,
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '3',
    name: 'Manarola',
    location: 'Italy',
    image: ICONS.BANNER_ICON3,
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
  {
    id: '4',
    name: 'Perhentian Islands',
    location: 'Malaysia',
    image: ICONS.BANNER_ICON,
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit.`,
  },
];

const HomeScreen = ({navigation}: any) => {
  const [open, setOpen] = useState(false);
  const [flag, setflag] = useState(true);
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userReducer);
  const noticeList = useAppSelector(state => state.userReducer.notice);
  const [noticeFilteredList, setNoticeFilteredList] =
    useState<Notice[]>(noticeList);

  useEffect(() => {
    dispatch(getAllNotice());
    dispatch(getAllMembers());
    if (user.isAdmin || user.isAOA) dispatch(getAllComplaints());
    dispatch(getComplaintsById({currentUserId: user.id}));
  }, []);
  useEffect(() => {
    if (flag) {
      if (user?.currentUser === user?.phoneNumber) {
        let no = user.currentUser.split('').reverse().join('');
        if (no == user.password) {
          setflag(false);
          setOpen(true);
        } else {
          setOpen(false);
        }
      } else if (user?.currentUser === user?.tenantPhoneNumber) {
        let no = user.currentUser.split('').reverse().join('');
        if (no == user.tenantPassword) {
          setflag(false);
          setOpen(true);
        } else {
          setOpen(false);
        }
      }
    }
  }, [user]);
  useEffect(() => {
    setNoticeFilteredList(noticeList);
  }, [noticeList]);
  useEffect(() => {
    let ar = noticeList.filter(item =>
      item.title.toLocaleLowerCase().includes(input.toLocaleLowerCase()),
    );
    setNoticeFilteredList(ar);
  }, [input]);

  const categoryList = [
    {
      title: 'Notice',
      Icon: (
        <Image
          style={{height: 30, width: 30, tintColor: COLORS.primary}}
          source={ICONS.NOTICE_ICON}
        />
      ),
    },
    {
      title: 'Members',
      Icon: (
        <Image
          style={{height: 30, width: 30, tintColor: COLORS.primary}}
          source={ICONS.MEMBERS_ICON}
        />
      ),
    },
    {
      title: 'Passes',
      Icon: (
        <Image
          style={{height: 50, width: 50, tintColor: COLORS.primary}}
          source={ICONS.BILL_ICON}
        />
      ),
    },
    {
      title: 'SOP',
      Icon: (
        <Image
          style={{height: 30, width: 30, tintColor: COLORS.primary}}
          source={ICONS.EVENT_ICON}
        />
      ),
    },
  ];

  const ListCategories = () => {
    return (
      <View style={style.categoryContainer}>
        {categoryList.map((item, index) => (
          <TouchableOpacity onPress={() => navigation.navigate(item.title)}>
            <View key={index} style={style.iconContainer}>
              {item.Icon}
            </View>
            <Text
              style={{
                marginTop: 15,
                ...FONTS.body7,
                textAlign: 'center',
                color: COLORS.gray,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <MainView>
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
          <StatusBar translucent={false} backgroundColor={COLORS.primary} />

          <View style={style.header}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.headerSecond]}
              style={{flex: 1}}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              locations={[0, 0.7]}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop:
                    Platform.OS == 'ios' ? (SIZES.height > 812 ? 45 : 35) : 15,
                  paddingBottom: 10,
                  paddingHorizontal: 20,
                  justifyContent: 'space-between',
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: 35, width: 35, borderRadius: 35}}
                  source={
                    user.currentUser === user.phoneNumber
                      ? user.imageUrl
                        ? {uri: user.imageUrl + ''}
                        : ICONS.PROFILE_ICON
                      : user.tenantImage
                      ? {uri: user.tenantImage + ''}
                      : ICONS.PROFILE_ICON
                  }
                />
                <Text style={{color: COLORS.white, ...FONTS.h3}}>
                  {new Date().toDateString()}
                </Text>
                {/* <TouchableOpacity>
                  <Image
                    style={{
                      height: 35,
                      width: 35,
                      marginRight: 10,
                      tintColor: COLORS.white,
                    }}
                    source={ICONS.NOTIFICATION_ICON}
                  />
                </TouchableOpacity> */}
              </View>
            </LinearGradient>
          </View>
          <View
            style={{
              backgroundColor: COLORS.primary,
              height:
                Platform.OS == 'ios' ? (SIZES.height > 812 ? 110 : 95) : 110,
            }}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.headerSecond]}
              style={{flex: 1}}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              locations={[0, 0.7]}>
              <View style={{paddingHorizontal: 20}}>
                <Text style={style.headerTitle}>Welcome</Text>
                <Text style={style.headerTitle}>
                  {user.currentUser === user.phoneNumber
                    ? user.ownerName
                    : user.tenantName}
                </Text>
              </View>
            </LinearGradient>
          </View>
          <ScrollView
            style={[{backgroundColor: COLORS.white}]}
            showsVerticalScrollIndicator={false}>
            <View style={{height: SIZES.height * 0.03}}></View>
            <Text
              style={{
                marginHorizontal: 20,
                marginTop: 35,
                ...FONTS.h2,
                color: COLORS.gray,
              }}>
              Services
            </Text>
            <ListCategories />
            <View>
              <Text style={style.sectionTitle}>Ads and offers</Text>
              <Banner data={places} />
              <Text style={style.sectionTitle}>Notice Board</Text>

              <FlatList
                contentContainerStyle={{marginTop: 20, marginHorizontal: '2%'}}
                data={noticeFilteredList}
                renderItem={({item, index}) => {
                  return (
                    <>
                      {index < 5 ? (
                        <NoticeCard item={item} index={index} />
                      ) : (
                        <></>
                      )}
                    </>
                  );
                }}
                ListFooterComponent={() => (
                  <View style={{height: SIZES.height * 0.05}} />
                )}
              />
            </View>
            <View style={{height: SIZES.height * 0.15}}></View>
            {/* </ScrollView> */}
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            width: '90%',
            alignSelf: 'center',
            marginTop:
              Platform.OS == 'ios' ? (SIZES.height > 812 ? 80 : 60) : 50,
          }}>
          <SearchBar
            value={input}
            placeholder="Search notice ..."
            onChangeText={text => setInput(text)}
            searchStyle={{top: 90}}
            shadow={'LIGHT'}
          />
        </View>
      </View>
      {open && (
        <ChangePasswordModal
          isVisible={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </MainView>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    // fontWeight: 'bold',
    ...FONTS.h2,
    fontSize: 20,
    // fontSize: 23,
  },
  inputContainer: {
    zIndex: 1,
    // height: 50,
    padding: '5%',
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    ...SHADOW_PRIMARY,
  },
  categoryContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    ...SHADOW,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    ...FONTS.h2,
    color: COLORS.black,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    marginRight: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
export default HomeScreen;
