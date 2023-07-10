import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {store} from './src/stateManagemer/Store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <RootNavigation />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
