import {
  Alert,
  LogBox,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/stateManagemer/Store';
import NetInfo from '@react-native-community/netinfo';
import NoDataFound from './src/components/NoDataFound';
// import CodePush from 'react-native-code-push';
import NoInterNet from './src/components/NoInternet';
import messaging from '@react-native-firebase/messaging';
import firestore, {Filter} from '@react-native-firebase/firestore';
import UpdateRequired from './src/components/UpdateRequired';
import PushNotification from 'react-native-push-notification';
import {ICONS} from './src/resources';
// let CodePushOptions = {
//   checkFrequency: CodePush.CheckFrequency.ON_APP_START,
//   mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
//   updateDialog: {
//     appendReleaseDescription: true,
//     title: 'a new update is available!',
//   },
// };
const MainComponent = ({status}: {status: boolean}) => {
  return (
    <View style={{flex: 1}}>
      {status ? <RootNavigation /> : <NoInterNet />}
    </View>
  );
};

const App = () => {
  const [status, setStatus] = useState(true);
  const [updateRequired, setUpdateRequired] = useState(false);
  const currentVersion = '2.0';
  const checkVersion = async () => {
    const complaintsRef = firestore().collection('AppInfo').doc('version');
    const snapshot = (await complaintsRef.get()).data();
    // const complaints = snapshot.docs.map(doc => doc.data());
    // const complaints = snapshot.docs?.[0]?.data();
    console.log(snapshot, 'BAWA');
    if (snapshot?.no && snapshot?.no != currentVersion) {
      setUpdateRequired(true);
    }
  };
  useEffect(() => {
    checkVersion();
    // CodePush.sync(
    //   {
    //     deploymentKey: 'fupvPATT23CMY06x_snAqDoIxGnrTAn-TbObT',
    //     installMode: CodePush.InstallMode.IMMEDIATE,
    //     mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
    //   },
    //   status => {
    //     console.log(status);
    //   },
    // );

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setStatus(state?.isConnected ?? false);
    });

    return () => {
      unsubscribe();
      // unsubscribe2();
    };
  }, []);
  // messaging().onTokenRefresh(newToken => {
  //   // Handle the token refresh event
  //   // Typically, you would send the newToken to your server
  //   // to ensure that it has the latest registration token for the device.
  //   console.log('Token refreshed:', newToken);
  // });
  messaging().onMessage(async remoteMessage => {
    console.log('message', remoteMessage);
    testFunction(remoteMessage);
  });

  const testFunction = async (remoteMessage: any) => {
    const data = await {
      id: 0,
      title: remoteMessage?.notification?.title ?? 'notification',
      message: remoteMessage?.notification?.body ?? 'notification',
      picture: ICONS.LOGO_ICON,
    };
    console.log(remoteMessage, 'HIIIIII');
    PushNotification.localNotification(data);
  };

  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      {updateRequired ? (
        <>
          <UpdateRequired />
        </>
      ) : (
        <MainComponent status={status} />
      )}
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
