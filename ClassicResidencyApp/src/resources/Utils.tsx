// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Alert} from 'react-native';
// import storage from '@react-native-firebase/storage';

// export const storeData = async (key: string, value: any) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem(key, jsonValue);
//   } catch (e) {
//     // saving error
//     Alert.alert('Error');
//   }
// };

// export const getData = async (key: string) => {
//   try {
//     let jsonValue = await AsyncStorage.getItem(key);
//     jsonValue = await JSON.parse(jsonValue ?? '');
//     // console.log(jsonValue, 'inside UTAils');
//     return jsonValue;
//   } catch (e) {
//     return null;
//   }
// };
// export const clearAll = async () => {
//   try {
//     await AsyncStorage.clear();
//   } catch (e) {
//     // clear error
//   }
//   console.log('Done.');
// };

// // Async Keys
// export const userDataSKeys = 'user_login_data';

// export const uploadImageToFirebase = async (image: any, imageName: string) => {
//   if (image != null && image.path != null) {
//     try {
//       const fileName = imageName + Date.now().toString();

//       const task = storage()
//         .ref()
//         .child(`images/${fileName}`)
//         .putFile(image.path);

//       // Monitor the upload progress
//       task.on('state_changed', snapshot => {
//         console.log(snapshot, 'FIle uploaded');
//         // Access the upload progress here if needed
//       });

//       // Wait for the upload to complete
//       await task;

//       // Get the download URL of the uploaded image
//       const downloadURL = await storage()
//         .ref(`images/${fileName}`)
//         .getDownloadURL();

//       return downloadURL;
//     } catch (error) {
//       // Handle any errors that occur during the upload process
//       console.error('Error uploading image:', error);
//     }
//   }
// };

// // const getDate = (date: string) => {
// //   let dateNew = new Date(date);
// //   return date;
// // };
