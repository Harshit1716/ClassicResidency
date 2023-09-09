import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Linking} from 'react-native';
import storage from '@react-native-firebase/storage';
import {COLORS} from './Theme';
import firestore from '@react-native-firebase/firestore';
import {FlatType} from '../stateManagemer/models/SocietyAppModal';
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

export const sendNotification = async (
  flatNo: string,
  title: string,
  body: string,
) => {
  const token =
    'c6N3hNErQQO8aZyCt16uyb:APA91bHHXR67SCKUJC8_sDHa1LMzH66xV0kLfFxyWxVopdgEKgxwnkTK6ZUjmW601fFkE8xNEF0Jn4SQySTYCYTHBVXRzIYTvl1XcqJHetv2Th2ImZQzjF5aSOBwa568hz2xS3vgkfC9", "fVyLk7EKSWuGk01HdO1k1U:APA91bHjrjSQJO-GhNbugFWrglEsL4N6XRHEkJEqm3gSG8uETlOap8oDy8rOp4iHJKHxLlmERjArYGNEN-wez-OHXe6CKUYloSumMfGKwYtBOE0GqMemk0loWjchFbjvyRD7z6IEJxtN';
  const key =
    'AAAAWn87M_w:APA91bEyxxyNL0a_ByXQunVocNgaVDVf9cGbAU1kY59GIQtrNzRDBxmnG3LjooXulBHJqIQ9DHOxMu95ZfvedUmfxBeY9Wo_SMm_yzMUNRLR2nxy3NQdN9Slg8RjaS5vpt43zyulhtbh';

  try {
    const flatsRef = firestore().collection('Users');
    const flatQuery = flatsRef.where('id', '==', flatNo).limit(1);
    const flatSnapshot = await flatQuery.get();

    const userDoc = flatSnapshot.docs[0];
    const user = userDoc.data();
    const tokenArray = user?.token ?? [];
    console.log(tokenArray, 'HAHAH');
    tokenArray.forEach((element: string) => {
      fetch('https://fcm.googleapis.com/fcm/send ', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'key=' + key,
        },
        method: 'POST',
        body: JSON.stringify({
          to: element,
          notification: {
            title: title,
            body: body,
            mutable_content: false,
            sound: 'Tri-tone',
          },
        }),
      })
        .then(res => res.json())
        .then(res => console.log(res));
    });
  } catch (er) {
    console.log(er);
  }
};

export const sendAllNotification = async (title: string, body: string) => {
  const token =
    'c6N3hNErQQO8aZyCt16uyb:APA91bHHXR67SCKUJC8_sDHa1LMzH66xV0kLfFxyWxVopdgEKgxwnkTK6ZUjmW601fFkE8xNEF0Jn4SQySTYCYTHBVXRzIYTvl1XcqJHetv2Th2ImZQzjF5aSOBwa568hz2xS3vgkfC9", "fVyLk7EKSWuGk01HdO1k1U:APA91bHjrjSQJO-GhNbugFWrglEsL4N6XRHEkJEqm3gSG8uETlOap8oDy8rOp4iHJKHxLlmERjArYGNEN-wez-OHXe6CKUYloSumMfGKwYtBOE0GqMemk0loWjchFbjvyRD7z6IEJxtN';
  const key =
    'AAAAWn87M_w:APA91bEyxxyNL0a_ByXQunVocNgaVDVf9cGbAU1kY59GIQtrNzRDBxmnG3LjooXulBHJqIQ9DHOxMu95ZfvedUmfxBeY9Wo_SMm_yzMUNRLR2nxy3NQdN9Slg8RjaS5vpt43zyulhtbh';

  try {
    const complaintsRef = firestore().collection('Users');
    const snapshot = await complaintsRef.get();
    const users: FlatType[] = snapshot.docs.map(doc => doc.data() as FlatType);
    users.forEach(item => {
      if (item?.token?.length > 0) {
        const tokenArray = item?.token ?? [];
        console.log(tokenArray, 'HAHAH');
        tokenArray.forEach((element: string) => {
          fetch('https://fcm.googleapis.com/fcm/send ', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'key=' + key,
            },
            method: 'POST',
            body: JSON.stringify({
              to: element,
              notification: {
                title: title,
                body: body,
                mutable_content: false,
                sound: 'Tri-tone',
              },
            }),
          })
            .then(res => res.json())
            .then(res => console.log(res));
        });
      }
    });
  } catch (er) {
    console.log(er);
  }
};
