import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from './Header';
import {COLORS, FONTS, ICONS, SHADOW, SIZES} from '../resources';
import {Image} from 'react-native-animatable';
// import Icon, {Icons} from './Icons';
import {SHADOW_PRIMARY} from '../resources/Theme';
import AppTextInput from './AppTextInput';
import ProfileTextInput from './ProfileTextInput';
import {ComplaintType, Notice} from '../stateManagemer/models/SocietyAppModal';

const ComplaintDetail = ({route}: any) => {
  const [data, setData] = useState<ComplaintType>(route?.params?.data);
  console.log(route.params.data);
  return (
    <View>
      <Header title="Complaint Detail" rightIconType="NONE" />
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{}}>
              <Text style={{...FONTS.h2}}>{data.title}</Text>
              <Text style={{...FONTS.body4, marginTop: 10}}>
                By : {data.by}
              </Text>
              <Text style={{...FONTS.body4}}>Flat No : {data.flatNo}</Text>
            </View>
            <Text style={{...FONTS.h4, marginTop: 5}}>{data.createdOn}</Text>
          </View>

          <Text style={{...FONTS.body3, marginTop: 10}}>
            Subject : {data.type}
          </Text>
          <Text
            style={[
              {
                width: '100%',
                alignSelf: 'center',
                ...FONTS.body3,
                marginVertical: SIZES.spacing,
              },
            ]}>
            {data.description}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...FONTS.body3, marginVertical: 10}}>
              Preffered Time :{' '}
            </Text>
            <View>
              {data.slots.map(item => (
                <Text style={{...FONTS.body3, marginVertical: 10}}>{item}</Text>
              ))}
            </View>
          </View>

          {data.imageUrl != '' && (
            <ImageBackground
              style={{
                height: 250,
                width: '100%',
                marginTop: '10%',
                borderRadius: 10,
                overflow: 'hidden',
              }}
              source={ICONS.BANNER_ICON2}></ImageBackground>
          )}
          <Text style={{...FONTS.body3}}>Status : {data.status}</Text>
          <Text style={{...FONTS.body3, marginTop: 8}}>
            Assigned To : {data.assignedTo != '' ? data.assignedTo : 'AOA'}
          </Text>
          <Text style={{...FONTS.h3}}>Thanks !</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ComplaintDetail;

const styles = StyleSheet.create({});
