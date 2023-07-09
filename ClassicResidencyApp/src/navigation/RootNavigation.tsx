import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, OnBoardingScreen} from '../screens';
import {useAppSelector} from '../stateManagemer/Store';
import WelcomeScreen from '../screens/OnBoardingScreen';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import BottomRouter from './BottomTabs';
import ProfileDetail from '../screens/ProfileDetail';
import Notice from '../screens/Notice';
import NoticeDetail from '../components/NoticeDetail';
import MemberCategory from '../screens/MemberCategory';
import MembersList from '../screens/MembersList';
import ComplaintsList from '../screens/ComplaintsList';

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  const email = useAppSelector(state => state.userReducer.id);
  const admin = useAppSelector(state => state.userReducer.isAdmin);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        // initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffedd5',
          },
        }}>
        {email == '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Welcome"
            component={OnBoardingScreen}
          />
        )}
        {email == '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
        )}
        {email != '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={BottomRouter}
          />
        )}
        {email != '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Profile"
            component={ProfileDetail}
          />
        )}
        {email != '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Notice"
            component={Notice}
          />
        )}
        {email != '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="NoticeDetail"
            component={NoticeDetail}
          />
        )}
        {email != '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Members"
            component={MemberCategory}
          />
        )}
        {email != '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="MembersList"
            component={MembersList}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
