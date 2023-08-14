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
import ComplaintDetail from '../components/ComplaintDetail';
import AdminComplaints from '../screens/AdminComplaints';
import NewUserScreen from '../screens/NewUserScreen';
import DirectoryList from '../screens/DirectoryList';
import BlockList from '../screens/BlockList';
import DirectoryDetailProfile from '../screens/DirectoryProfileDetail';
import AdminComplaintDetail from '../components/AdminComplaintDetail';
import AddDetail from '../screens/AddDetail';
import CreateAddScreen from '../screens/CreateAddScreen';

const RootStack = createNativeStackNavigator();
const RootNavigation = () => {
  const email = useAppSelector(state => state.userReducer.id);
  const AOA = useAppSelector(state => state.userReducer.isAOA);
  const admin = useAppSelector(state => state.userReducer.isAdmin);
  const block = useAppSelector(state => state.userReducer.block);

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
        {email == '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="NewUserScreen"
            component={NewUserScreen}
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
        {email != '' && block == 'Z' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="CreateAdd"
            component={CreateAddScreen}
          />
        )}
        {email != '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="AddDetail"
            component={AddDetail}
          />
        )}
        {(admin || AOA) && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="AdminComplaintDetail"
            component={AdminComplaintDetail}
          />
        )}
        {email != '' && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="ComplaintDetail"
            component={ComplaintDetail}
          />
        )}
        {(admin || AOA) && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="AllComplaints"
            component={AdminComplaints}
          />
        )}
        {(admin || AOA) && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="Directory"
            component={DirectoryList}
          />
        )}
        {(admin || AOA) && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="BlockList"
            component={BlockList}
          />
        )}
        {(admin || AOA) && (
          <RootStack.Screen
            options={{
              headerShown: false,
            }}
            name="DirectoryDetailProfile"
            component={DirectoryDetailProfile}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
