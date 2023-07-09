import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainView from '../components/MainView';
import Header from '../components/Header';

const ShopsList = () => {
  return (
    <MainView>
      <Header hideBackIcon={true} title={'SHOPS'} rightIconType="NONE" />
      <Text>ShopsList</Text>
    </MainView>
  );
};

export default ShopsList;

const styles = StyleSheet.create({});
