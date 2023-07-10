import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import Icon, {Icons} from '../components/Icons';
import * as Animatable from 'react-native-animatable';
import {COLORS, ICONS} from '../resources';
import {Home} from '../screens';
import {SHADOW_PRIMARY, SIZES} from '../resources/Theme';
// import ComplaintsList from '../screens/ComplaintsList';
// import ShopsList from '../screens/ShopsList';
// import Engage from '../screens/Engage';

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    // type: Icons.MaterialIcons,
    icon: ICONS.HOME_TAB_ICON,
    component: Home,
  },
  {
    route: 'Engage',
    label: 'Engage',
    // type: Icons.FontAwesome,
    icon: ICONS.BUILDING_ICON,
    component: Home,
  },
  {
    route: 'Add',
    label: 'Complaints',
    // type: Icons.MaterialIcons,
    icon: ICONS.ADD_ICON,
    component: Home,
  },
  {
    route: 'Shop',
    label: 'Shops',
    // type: Icons.MaterialCommunityIcons,
    icon: ICONS.SHOPS_ICON,
    component: Home,
  },
  {
    route: 'Account',
    label: 'Account',
    // type: Icons.FontAwesome,
    icon: ICONS.ACCOUNT_TAB_ICON,
    component: Home,
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -34},
  1: {scale: 1.2, translateY: -24},
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
};

const circle1 = {
  0: {scale: 0},
  0.3: {scale: 0.9},
  0.5: {scale: 0.2},
  0.8: {scale: 0.7},
  1: {scale: 1},
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef?.current.animate(animate1);
      circleRef?.current.animate(circle1);
      textRef?.current.transitionTo({scale: 1});
    } else {
      viewRef?.current.animate(animate2);
      circleRef?.current.animate(circle2);
      textRef?.current.transitionTo({scale: 0});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={500} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          {/* <Icon
            size={item.route == 'Engage' ? 20 : 25}
            type={item.type}
            name={item.icon}
            color={focused ? COLORS.white : COLORS.primary}
          /> */}
          <Image
            source={item.icon}
            style={{
              tintColor: focused ? COLORS.white : COLORS.primary,
              height: 25,
              width: 25,
            }}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function Bottoms() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          Platform.OS == 'ios'
            ? SIZES.height >= 812
              ? {height: 72}
              : {height: 60}
            : {height: 60},
        ],
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? (SIZES.height >= 812 ? 15 : 0) : 0,
    flex: 1,
    justifyContent: 'center',
    // marginBottom: '20%',
    alignItems: 'center',
  },
  tabBar: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    left: 16,
    borderRadius: 16,
    ...SHADOW_PRIMARY,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: COLORS.white,
    marginVertical: 10,
    // backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.primary,
  },
});
