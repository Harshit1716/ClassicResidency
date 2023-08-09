import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Linking} from 'react-native';
import storage from '@react-native-firebase/storage';
import {COLORS} from './Theme';

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    Alert.alert('Error');
  }
};

export const getData = async (key: string) => {
  try {
    let jsonValue = await AsyncStorage.getItem(key);
    jsonValue = await JSON.parse(jsonValue ?? '');
    // console.log(jsonValue, 'inside UTAils');
    return jsonValue;
  } catch (e) {
    return null;
  }
};
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
  // console.log('Done.');
};

// Async Keys
export const userDataSKeys = 'user_login_data';

export const uploadImageToFirebase = async (image: any) => {
  if (
    image != null &&
    image?.assets.length != 0 &&
    image?.assets?.[0]?.uri != null
  ) {
    try {
      const fileName = Date.now().toString();

      const task = storage()
        .ref()
        .child(`images/${image?.assets?.[0]?.fileName}`)
        .putFile(image?.assets?.[0]?.uri);

      // Monitor the upload progress
      task.on('state_changed', snapshot => {
        console.log(snapshot, 'FIle uploaded');
        // Access the upload progress here if needed
      });

      // Wait for the upload to complete
      await task;

      // Get the download URL of the uploaded image
      const downloadURL = await storage()
        .ref(`images/${image?.assets?.[0]?.fileName}`)
        .getDownloadURL();

      return downloadURL;
    } catch (error) {
      // Handle any errors that occur during the upload process
      console.error('Error uploading image:', error);
    }
  }
};
export const redirectToPhoneNumber = (number: any) => {
  const phoneNumber = `tel:${number}`; // Replace with the desired phone number

  Linking.openURL(phoneNumber).catch(error => {
    console.log('Failed to open phone number screen:', error);
  });
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'red';
    case 'InProgress':
      return 'lightblue';
    case 'Closed':
      return 'green';
    case 'None':
      return 'gray';
    default:
      return 'red';
  }
};
