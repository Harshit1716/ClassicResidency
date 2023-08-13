import {Alert, LogBox, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/stateManagemer/Store';
import NetInfo from '@react-native-community/netinfo';
import NoDataFound from './src/components/NoDataFound';
import CodePush from 'react-native-code-push';

let CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: 'a new update is available!',
  },
};
const MainComponent = ({status}: {status: boolean}) => {
  return (
    <View style={{flex: 1}}>
      {status ? <RootNavigation /> : <NoDataFound />}
    </View>
  );
};

const App = () => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    CodePush.sync(
      {
        deploymentKey: 'fupvPATT23CMY06x_snAqDoIxGnrTAn-TbObT',
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      },
      status => {
        console.log(status);
      },
    );
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setStatus(state?.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <MainComponent status={status} />
    </Provider>
  );
};

export default CodePush(App);

const styles = StyleSheet.create({});
