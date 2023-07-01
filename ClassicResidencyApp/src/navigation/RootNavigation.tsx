import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, OnBoardingScreen} from '../screens';
import {useAppSelector} from '../stateManagemer/Store';
import WelcomeScreen from '../screens/OnBoardingScreen';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import BottomRouter from './BottomTabs';

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  //   const email = useAppSelector(state => state.userReducer.id);
  //   const admin = useAppSelector(state => state.userReducer.isAdmin);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        // initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffedd5',
          },
        }}>
        {/* {email == '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="OnBoarding"
            component={OnBoarding}
          />
        )} */}
        {true && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Welcome"
            component={OnBoardingScreen}
          />
        )}
        {true && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={Login}
          />
        )}
        {true && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={BottomRouter}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
