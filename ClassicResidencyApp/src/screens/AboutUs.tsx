import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SHADOW} from '../resources';
import MainView from '../components/MainView';
import Header from '../components/Header';

const AboutUs = () => {
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
            {`Welcome to Classic Residency App, your ultimate solution for modern Apartment Owners Association (AOA) management. Our app revolutionizes communication, administration, and community engagement, creating a seamless experience for residents and management.

What Sets Us Apart:-

* Effortless Communication: Instantly connect with neighbors, receive updates, and stay informed on community news.

*  Streamlined Management: Simplify maintenance requests, amenity bookings, and administrative tasks through our intuitive interface.

*Transparent Operations: Access financial reports, meeting minutes, and important documents for a clear view of AOA activities.

*Community Building: Coordinate events, workshops, and gatherings to foster a sense of togetherness among residents.

*Privacy & Security: Rest assured knowing your data is protected with top-tier security measures.

Why Choose Classic Residency : 

1.Customized for apartment living, catering to the unique needs of residents and AOAs.

2.User-friendly design ensures easy navigation for residents of all backgrounds.

3.Dedicated support team available to assist with inquiries and technical support.

4.Elevate your apartment living experience with Classic Residency App. Connect, engage, and simplify – all in the palm of your hand.`}{' '}
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

export default AboutUs;

const styles = StyleSheet.create({});
