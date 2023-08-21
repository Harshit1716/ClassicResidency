import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SHADOW} from '../resources';
import MainView from '../components/MainView';
import Header from '../components/Header';

const ContactUs = () => {
  return (
    <MainView>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <Header title="About Us" rightIconType="NONE" />
      <ScrollView>
        <View
          style={{
            width: '95%',
            // height: SIZES.height * 1.4,
            backgroundColor: COLORS.white,
            alignSelf: 'center',
            marginTop: '5%',
            marginBottom: '35%',
            borderRadius: 10,
            padding: '5%',
            ...SHADOW,
          }}>
          <Text style={{...FONTS.body4, color: COLORS.black}}>
            Welcome to the Classic Residency App, your personalized solution for
            efficient and effective Apartment Owners Association (AOA)
            management. Our app is designed with your convenience and community
            in mind, providing you with a seamless platform to enhance
            communication, streamline operations, and foster a stronger sense of
            unity within your residential complex. Our Mission At Classic
            Residency App, our mission is to empower and simplify the lives of
            apartment residents and management alike. We understand the unique
            challenges that come with managing an apartment complex, and we are
            dedicated to providing a comprehensive tool that bridges the gap
            between residents, association members, and property management.
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.black, marginTop: 20}}>
            Why Choose Classic Residency App Tailored for You: Our app is
            customized to meet the specific needs of apartment residents and
            AOAs, providing a platform that truly addresses your requirements.
            User-Friendly: Navigating our app is intuitive and user-friendly,
            making it accessible for residents of all ages and tech-savviness
            levels. Dedicated Support: Our support team is committed to
            assisting you every step of the way. Whether you have questions,
            feedback, or technical issues, we're here to help. Join us on a
            journey towards streamlined apartment living, enhanced community
            engagement, and efficient AOAs management. The Classic Residency App
            is here to make a positive difference in your residential
            experience. Welcome to a new era of connected living.
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.black, marginTop: 20}}>
            Download the Classic Residency App today and unlock a world of
            convenience and connectivity.
          </Text>
        </View>
      </ScrollView>
    </MainView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({});
