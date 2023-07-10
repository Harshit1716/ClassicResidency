import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainView from '../components/MainView';
import Header from '../components/Header';

const Engage = () => {
  return (
    <MainView>
      <Header hideBackIcon={true} title={'Engage'} rightIconType="NONE" />
      <Text>Engage</Text>
    </MainView>
  );
};

export default Engage;

const styles = StyleSheet.create({});
