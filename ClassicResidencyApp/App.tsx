import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <RootNavigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
