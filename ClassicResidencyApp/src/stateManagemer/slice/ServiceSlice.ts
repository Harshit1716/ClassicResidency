import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  AddedMember,
  Ads,
  ComplaintType,
  FlatType,
  Members,
  Notice,
} from '../models/SocietyAppModal';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {
  clearAll,
  storeData,
  uploadImageToFirebase,
  userDataSKeys,
} from '../../resources/Utils';

// method for userlogin
export const login = createAsyncThunk(
  'user/login',
  async (
    {
      phoneNumber,
      password,
      flatNo,
    }: {phoneNumber: string; password: string; flatNo: string},
    {rejectWithValue},
  ) => {
    try {
      const flatsRef = firestore().collection('Users');

      const flatQuery = flatsRef.where('id', '==', flatNo).limit(1);
      const flatSnapshot = await flatQuery.get();

      if (flatSnapshot.empty) {
        Alert.alert('Error', 'Invalid flat number');
        throw new Error('Invalid flat number');
      }

      const userDoc = flatSnapshot.docs[0];
      const user = userDoc.data();
      if (
        (user.phoneNumber === phoneNumber && user.password === password) ||
        (user.tenantPhoneNumber === phoneNumber &&
          user.tenantPassword === password)
      ) {
        user.currentUser =
          user.tenantPhoneNumber === phoneNumber
            ? user.tenantPhoneNumber
            : user.phoneNumber;
        return user;
      } else {
        Alert.alert('Error', 'Invalid phone number or password');
        throw new Error('Invalid phone number or password');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Method for user creation
export const createUser = createAsyncThunk(
  'user/createUser',
  async (
    {
      flatNumber,
      flatType,
      block,
      name,
      email,
      phoneNumber,
    }: {
      flatNumber: string;
      flatType: string;
      block: string;
      name: string;
      email: string;
      phoneNumber: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const id = block + flatType + flatNumber;
      const userRef = firestore().collection('Users').doc(id);
      const existingUserDoc = await userRef.get();

      if (existingUserDoc.exists) {
        Alert.alert('Error', 'Flat already exists');
        throw new Error('Flat already exists');
      }
      // const query = firestore()
      //   .collection('Users')
      //   .where('phoneNumber', '==', phoneNumber)
      //   .get();

      // const query2 = firestore()
      //   .collection('Users')
      //   .where('tenantPhoneNumber', '==', phoneNumber)
      //   .get();

      // const [snapshot, snapshot2] = await Promise.all([query, query2]);

      const password = await phoneNumber.split('').reverse().join('');
      const user: AddedMember = {
        id: id,
        block: block,
        flatType: flatType,
        flatNumber: flatNumber,
        ownerName: name,
        phoneNumber: phoneNumber,
        email: email,
        imageUrl: '',
        complaints: [],
        isTenantAdded: false,
        isAdmin: false,
        isAOA: false,
        tenantName: 'Monika',
        tenantEmail: '8920592552',
        tenantPhoneNumber: '',
        tenantPassword: '',
        tenantImage: '',
        password: password,
      };

      await userRef.set(user);

      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  },
);
export const uploadProfilePic = createAsyncThunk(
  'user/uploadProfilePic',
  async ({image, flag, userId}: any, {rejectWithValue}) => {
    try {
      let imageurl = '';
      if (image) imageurl = (await uploadImageToFirebase(image)) ?? '';
      const userRef = firestore().collection('Users').doc(userId);

      const ownerImage = {
        imageUrl: imageurl,
      };
      const tenantImage = {
        tenantImage: imageurl,
      };

      await userRef.update(flag ? ownerImage : tenantImage);

      return flag ? ownerImage.imageUrl : tenantImage.tenantImage;
    } catch (error) {
      console.log(error);
      Alert.alert('ERROR', error?.message + '');
      return rejectWithValue(error?.message);
    }
  },
);
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (
    {
      userId,
      ownerName,
      email,
      password,
      phoneNumber,
      tenantName,
      tenantEmail,
      tenantPassword,
      tenantPhoneNumber,
    }: any,
    {rejectWithValue},
  ) => {
    try {
      const userRef = firestore().collection('Users').doc(userId);
      const data = {
        ownerName,
        email,
        password,
        phoneNumber,
        tenantName,
        tenantEmail,
        tenantPassword,
        tenantPhoneNumber,
      };
      await userRef.update(data);
      // const updatedUserRef = firestore().collection('Users').doc(userId);
      return true;
    } catch (error) {
      console.log(error);
      Alert.alert('ERROR', error?.message + '');
      return rejectWithValue(error?.message);
    }
  },
);
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (
    {password, user}: {password: string; user: FlatType},
    {rejectWithValue},
  ) => {
    try {
      const userRef = firestore().collection('Users').doc(user.id);

      let flag = user.currentUser == user.phoneNumber;
      const owner = {
        password: password,
      };
      const tenant = {
        tenantPassword: password,
      };

      console.log(flag, 'BHSBH');
      await userRef.update(flag ? owner : tenant);

      return flag ? owner.password : tenant.tenantPassword;
    } catch (error) {
      console.log(error);
      Alert.alert('ERROR', error?.message + '');
      return rejectWithValue(error?.message);
    }
  },
);
export const createNotice = createAsyncThunk(
  'user/createNotice',
  async ({title, des, subject, user, image}: any, {rejectWithValue}) => {
    try {
      let imageurl = '';
      if (image) imageurl = (await uploadImageToFirebase(image)) ?? '';
      const noticeData: Notice = {
        id: title + Date.now(),
        title: title,
        description: des,
        subject: subject,
        createdAt: new Date().toLocaleDateString(),
        createdBy: user,
        imageUrl: imageurl,
      };

      const noticesCollectionRef = firestore()
        .collection('notice')
        .doc(title + Date.now());
      await noticesCollectionRef.set(noticeData);
      return noticeData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  },
);

export const deleteNotice = createAsyncThunk(
  'user/deleteNotice',
  async (id: string, {rejectWithValue}) => {
    try {
      const noticesCollectionRef = firestore().collection('notice');
      const snapshot = await noticesCollectionRef.where('id', '==', id).get();
      if (snapshot.empty) {
        const errorMessage = "Notice doesn't exist";
        Alert.alert('Error', errorMessage);
        return rejectWithValue(errorMessage);
      }
      const docId = snapshot.docs[0].id;
      await noticesCollectionRef.doc(docId).delete();
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  },
);

export const deleteMember = createAsyncThunk(
  'user/deleteMember',
  async (id: string, {rejectWithValue}) => {
    try {
      const noticesCollectionRef = firestore().collection('members');
      const snapshot = await noticesCollectionRef.where('id', '==', id).get();
      if (snapshot.empty) {
        const errorMessage = "Member doesn't exist";
        Alert.alert('Error', errorMessage);
        return rejectWithValue(errorMessage);
      }
      const docId = snapshot.docs[0].id;
      await noticesCollectionRef.doc(docId).delete();
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  },
);

export const createComplaint = createAsyncThunk(
  'user/createComplaints',
  async (
    {title, des, type, slots, flatNo, user, image, userName}: any,
    {rejectWithValue},
  ) => {
    try {
      let imageurl = '';
      if (image) imageurl = (await uploadImageToFirebase(image)) ?? '';
      let id = title + Date.now();
      const noticeData: ComplaintType = {
        by: userName,
        id: id,
        title: title,
        description: des,
        type: type,
        slots: slots,
        createdOn: new Date().toLocaleDateString(),
        imageUrl: imageurl,
        flatId: user,
        flatNo: flatNo,
        assignedTo: '',
        status: 'Pending',
        hide: false,
      };

      const noticesCollectionRef = firestore().collection('complaints').doc(id);
      await noticesCollectionRef.set(noticeData);
      const userRef = firestore().collection('Users').doc(user);
      await userRef.update({
        complaints: firestore.FieldValue.arrayUnion(id),
      });
      return noticeData;
    } catch (error) {
      console.log(error);
      Alert.alert('ERROR', error?.message + '');
      return rejectWithValue(error?.message);
    }
  },
);

export const addTenant = createAsyncThunk(
  'user/addTenant',
  async (
    {userId, name, number, email, isTenant, image, actionType}: any,
    {rejectWithValue},
  ) => {
    try {
      let imageurl = '';
      if (image) imageurl = (await uploadImageToFirebase(image)) ?? '';
      const userRef = firestore().collection('Users').doc(userId);
      const password = await number.split('').reverse().join('');
      const query = firestore()
        .collection('Users')
        .where('phoneNumber', '==', number)
        .get();

      const query2 = firestore()
        .collection('Users')
        .where('tenantPhoneNumber', '==', number)
        .get();

      const [snapshot, snapshot2] = await Promise.all([query, query2]);

      if (actionType == 'ADD' && (!snapshot.empty || !snapshot2.empty)) {
        // Alert.alert('Error', 'Phone number already exists');
        throw new Error('Phone number already exists');
      }

      const tenantData = {
        tenantName: name,
        tenantEmail: email,
        tenantPhoneNumber: number,
        tenantPassword: password,
        tenantImage: imageurl,
        isTenantAdded: isTenant,
      };

      await userRef.update(tenantData);

      // const snapshot = await userRef.get();

      // let user = snapshot.data();

      return tenantData;
    } catch (error) {
      console.log(error);
      Alert.alert('ERROR', error?.message + '');
      return rejectWithValue(error?.message);
    }
  },
);

export const updateAssignedTo = createAsyncThunk(
  'user/updateAssignedTo',
  async (
    {id, assignedTo, status}: {id: string; assignedTo: string; status: string},
    {rejectWithValue},
  ) => {
    try {
      const userRef = firestore().collection('complaints').doc(id);
      await userRef.update({
        assignedTo: assignedTo,
        status: status,
      });
      return userRef;
    } catch (error) {
      console.log(error);
      Alert.alert('ERROR', error?.message + '');
      return rejectWithValue(error?.message);
    }
  },
);
export const updateComplaintComment = createAsyncThunk(
  'user/updateComments',
  async (
    {
      id,
      text,
      user,
      type,
    }: {id: string; text: string; user: string; type: string},
    {rejectWithValue},
  ) => {
    try {
      // const userRef = firestore().collection('complaints').doc(id);
      // const comments = userRef?.data().comments || [];
      const complaintsRef = firestore().collection('complaints');
      const complaintDoc = await complaintsRef.doc(id).get();
      if (!complaintDoc.exists) {
        throw new Error('Complaint not found');
      }

      const comments = complaintDoc?.data().comments || [];

      const updatedComments = [
        {id: user, text: text, date: new Date().toLocaleDateString()},
        ...comments,
      ];

      await complaintsRef.doc(id).update({comments: updatedComments});
      console.log(comments);
      let obj = {
        id: id,
        comments: updatedComments ?? [],
        type: type,
      };
      return obj;
    } catch (error) {
      console.log(error);
      Alert.alert('ERROR', error?.message + '');
      return rejectWithValue(error?.message);
    }
  },
);

// method to get all the complaints
export const getAllComplaints = createAsyncThunk(
  'user/getAllComplaints',
  async (_, {rejectWithValue}) => {
    try {
      const complaintsRef = firestore()
        .collection('complaints')
        .orderBy('createdOn', 'desc');
      const snapshot = await complaintsRef.get();
      // const complaints = snapshot.docs.map(doc => doc.data());
      const complaints: ComplaintType[] = snapshot.docs.map(
        doc => doc.data() as ComplaintType,
      );
      return complaints;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const getAllNotice = createAsyncThunk(
  'user/getAllNotice',
  async (_, {rejectWithValue}) => {
    try {
      const complaintsRef = firestore()
        .collection('notice')
        .orderBy('createdAt', 'desc');
      const snapshot = await complaintsRef.get();
      const complaints: Notice[] = snapshot.docs.map(
        doc => doc.data() as Notice,
      );
      return complaints;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const getAllAds = createAsyncThunk(
  'user/getAllAds',
  async (_, {rejectWithValue}) => {
    try {
      const complaintsRef = firestore()
        .collection('Ads')
        .orderBy('createdAt', 'asc');
      const snapshot = await complaintsRef.get();
      const complaints: Ads[] = snapshot.docs.map(doc => doc.data() as Ads);
      const bannerRef = firestore()
        .collection('Banners')
        .orderBy('createdAt', 'asc');
      const snapshot2 = await bannerRef.get();
      const banners: Ads[] = snapshot2.docs.map(doc => doc.data() as Ads);
      return {ads: complaints, banner: banners};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const createMember = createAsyncThunk(
  'user/createMember',
  async ({name, type, number, image, designation}: any, {rejectWithValue}) => {
    try {
      const existingMember = await firestore()
        .collection('members')
        .where('phoneNumber', '==', number)
        .get();

      if (!existingMember.empty) {
        const errorMessage = 'Member with this phone number already exists.';
        console.log(errorMessage);
        Alert.alert('Error', errorMessage);
        return rejectWithValue(errorMessage);
      }
      let id = name + Date.now();
      let imageurl = '';
      if (image) imageurl = (await uploadImageToFirebase(image)) ?? '';
      const memberData: Members = {
        id: id,
        imageUrl: imageurl,
        name: name,
        phoneNumber: number,
        type: type,
        designation: designation,
        assignedComplaints: [],
      };

      const memberCollectionRef = firestore().collection('members').doc(id);
      await memberCollectionRef.set(memberData);
      return memberData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message);
    }
  },
);
export const getAllMembers = createAsyncThunk(
  'user/getAllMembers',
  async (_, {rejectWithValue}) => {
    try {
      const complaintsRef = firestore().collection('members');
      const snapshot = await complaintsRef.get();
      // const complaints = snapshot.docs.map(doc => doc.data());
      const complaints: Members[] = snapshot.docs.map(
        doc => doc.data() as Members,
      );
      return complaints;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const getComplaintsById = createAsyncThunk(
  'user/getComplaintsById',
  async ({currentUserId}: {currentUserId: string}, {rejectWithValue}) => {
    try {
      const complaintsRef = firestore()
        .collection('complaints')
        .orderBy('createdOn', 'desc');
      const snapshot = await complaintsRef.get();
      // const complaints = snapshot.docs.map(doc => doc.data());
      let complaints: ComplaintType[] = snapshot.docs.map(
        doc => doc.data() as ComplaintType,
      );
      complaints = complaints.filter(item => item.flatId === currentUserId);
      console.log(complaints);
      return complaints;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState: FlatType = {
  password: '',
  id: '',
  block: '',
  flatNumber: '',
  ownerName: '',
  flatType: '',
  phoneNumber: '',
  complaints: [],
  adminComplaints: [],
  notice: [],
  isAdmin: false,
  isAOA: false,
  loading: false,
  error: null,
  members: [],
  email: '',
  imageUrl: '',
  isTenantAdded: false,
  currentUser: -1 + '',
  tenantName: '',
  tenantEmail: '',
  tenantPhoneNumber: '',
  tenantPassword: '',
  tenantImage: '',
  adsList: [],
  bannerList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, {payload}: PayloadAction<FlatType>) => {
      state.loading = false;
      state.id = payload.id;
      state.block = payload.block;
      state.flatType = payload.flatType;
      state.flatNumber = payload.flatNumber;
      state.ownerName = payload.ownerName;
      state.password = payload.password;
      state.email = payload.email;
      state.imageUrl = payload.imageUrl;
      state.phoneNumber = payload.phoneNumber;

      state.complaints = payload.complaints;
      state.isAdmin = payload.isAdmin;
      state.isAOA = payload.isAOA;
      state.isTenantAdded = payload.isTenantAdded;
      state.currentUser = payload.currentUser;

      // if (payload.isTenantAdded) {
      state.tenantName = payload.tenantName;
      state.tenantEmail = payload.tenantEmail;
      state.tenantPhoneNumber = payload.tenantPhoneNumber;
      // }
      state.error = null;
    },
    logout: state => {
      (state.password = ''),
        (state.id = ''),
        (state.block = ''),
        (state.flatNumber = ''),
        (state.ownerName = ''),
        (state.flatType = ''),
        (state.phoneNumber = ''),
        (state.complaints = []),
        (state.adminComplaints = []),
        (state.notice = []),
        (state.isAdmin = false),
        (state.isAOA = false),
        (state.loading = false),
        (state.error = null),
        (state.members = []),
        (state.email = ''),
        (state.imageUrl = ''),
        (state.isTenantAdded = false),
        (state.currentUser = -1);
      clearAll();
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.id = action.payload.id;
      state.block = action.payload.block;
      state.flatType = action.payload.flatType;
      state.flatNumber = action.payload.flatNumber;
      state.ownerName = action.payload.ownerName;
      state.password = action.payload.password;
      state.imageUrl = action.payload.imageUrl;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;

      state.complaints = action.payload.complaints;
      state.isAdmin = action.payload.isAdmin;
      state.isAOA = action.payload.isAOA;
      state.isTenantAdded = action.payload.isTenantAdded;
      state.currentUser = action.payload.currentUser;
      // if (action.payload.isTenantAdded) {
      state.tenantName = action.payload.tenantName;
      state.tenantEmail = action.payload.tenantEmail;
      state.tenantPassword = action.payload.tenantPassword;
      state.tenantPhoneNumber = action.payload.tenantPhoneNumber;

      let user = {
        phoneNumber: '',
        password: '',
        id: '',
      };
      if (state.currentUser === state.phoneNumber) {
        user.password = state.password;
        user.phoneNumber = state.phoneNumber;
        user.id = state.id;
      } else if (state.currentUser === state.tenantPhoneNumber) {
        user.password = state.tenantPassword;
        user.phoneNumber = state.tenantPhoneNumber;
        user.id = state.id;
      }
      // }
      state.error = null;
      storeData(userDataSKeys, user);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      Alert.alert('success', 'Profile has been Added');
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Complaints
    builder.addCase(getAllComplaints.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllComplaints.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      state.adminComplaints = action.payload;
    });
    builder.addCase(getAllComplaints.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getComplaintsById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getComplaintsById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      console.log(action.payload, 'BHSDK');
      state.complaints = action.payload;
    });
    builder.addCase(getComplaintsById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Notices
    builder.addCase(getAllNotice.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllNotice.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      state.notice = action.payload;
    });
    builder.addCase(getAllNotice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllAds.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllAds.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.adsList = action.payload.ads;
      console.log(action.payload.banner, 'BHSdK@');
      state.bannerList = action.payload.banner;
    });
    builder.addCase(getAllAds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createNotice.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNotice.fulfilled, (state, action) => {
      state.loading = false;
      Alert.alert('Success', 'Notice created successfully');
      state.notice = [action.payload, ...state.notice];
    });
    builder.addCase(createNotice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteNotice.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteNotice.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload != null ||
        action.payload != undefined ||
        action.payload != ''
      )
        Alert.alert('Success', 'Notice has been deleted successfully');
    });
    builder.addCase(deleteNotice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Members
    builder.addCase(getAllMembers.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      state.members = action.payload;
    });

    builder.addCase(getAllMembers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createMember.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createMember.fulfilled, (state, action) => {
      state.loading = false;
      Alert.alert('Success', 'Notice created successfully');
      state.members = [action.payload, ...state.members];
    });
    builder.addCase(createMember.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteMember.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      state.loading = false;
      if (
        action.payload != null ||
        action.payload != undefined ||
        action.payload != ''
      )
        Alert.alert('Success', 'Member has been deleted successfully');
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createComplaint.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createComplaint.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload != null || action.payload != undefined)
        Alert.alert('Success', 'Complaints has been registed successfully');
      state.complaints = [action.payload, ...state.complaints];
    });
    builder.addCase(createComplaint.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateAssignedTo.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateAssignedTo.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload != null || action.payload != undefined)
        Alert.alert('Success', 'Complaint have been updated ');
      // state.complaints = [action.payload, ...state.complaints];
    });
    builder.addCase(updateAssignedTo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateComplaintComment.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateComplaintComment.fulfilled, (state, action) => {
      state.loading = false;
      let {payload} = action;
      if (action.payload != null || action.payload != undefined) {
        let index = -1;
        if (payload.type === 'personal') {
          index = state.complaints.findIndex(item => item.id == payload.id);

          if (index != -1) {
            state.complaints[index].comments = payload.comments;
            console.log(state.complaints, 'HERE AA');
          }
        } else if (payload.type == 'all') {
          index = (state?.adminComplaints ?? []).findIndex(
            item => item.id == payload.id,
          );
          if (index != -1) {
            state.complaints[index].comments = payload.comments;
          }
        }
      }
      // state.complaints = [action.payload, ...state.complaints];
    });
    builder.addCase(updateComplaintComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updatePassword.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      // if (action.payload != null || action.payload != undefined)
      console.log(action.payload, 'BHSDK');
      // state = {...state, ...action.payload};
      if (state.currentUser === state.phoneNumber) {
        state.password = action.payload;
      } else if (state.currentUser === state.tenantPhoneNumber) {
        state.tenantPassword = action.payload;
      }

      Alert.alert('Success', 'Password hs been changed ');
      // state.complaints = [action.payload, ...state.complaints];
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addTenant.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTenant.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload != null || action.payload != undefined)
        if (action.payload.tenantName == '')
          Alert.alert('Success', 'Member has been deleted ');
        else Alert.alert('Success', 'Member has been added ');
      state.tenantName = action.payload.tenantName;
      state.tenantEmail = action.payload.tenantEmail;
      state.tenantPhoneNumber = action.payload.tenantPhoneNumber;
      state.tenantPassword = action.payload.tenantPassword;
      state.tenantImage = action.payload.tenantImage;
    });
    builder.addCase(addTenant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(uploadProfilePic.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadProfilePic.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload != null || action.payload != undefined)
        Alert.alert('Success', 'Profile picture has been updated ');
      if (state.currentUser === state.phoneNumber) {
        state.imageUrl = action.payload;
      } else if (state.currentUser === state.tenantPhoneNumber) {
        state.tenantImage = action.payload;
      }
    });
    builder.addCase(uploadProfilePic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProfile.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {loginUser, logout} = userSlice.actions;

export default userSlice.reducer;
