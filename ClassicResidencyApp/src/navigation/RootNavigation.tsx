import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login} from '../screens';
import {useAppSelector} from '../stateManagemer/Store';
import WelcomeScreen from '../screens/OnBoardingScreen';

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  //   const email = useAppSelector(state => state.userReducer.id);
  //   const admin = useAppSelector(state => state.userReducer.isAdmin);

  return (
    <NavigationContainer>
      <RootStack.Navigator
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
            component={WelcomeScreen}
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
