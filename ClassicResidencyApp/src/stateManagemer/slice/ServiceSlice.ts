import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  AddedMember,
  ComplaintType,
  FlatType,
  Members,
  Notice,
} from '../models/SocietyAppModal';
import firestore from '@react-native-firebase/firestore';
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
    {phoneNumber, password}: {phoneNumber: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      console.log('inside');
      const flatsRef = firestore().collection('Users');
      const snapshot = await flatsRef
        .where('phoneNumber', '==', phoneNumber)
        .where('password', '==', password)
        .get();

      if (snapshot.empty) {
        Alert.alert('Error', 'Invalid phone number or password');
        throw new Error('Invalid phone number or password');
      }
      let user = snapshot.docs[0].data();

      user['currentUser'] = phoneNumber;
      return user;
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
      console.log('STarted');
      const id = block + flatType + flatNumber;
      const userRef = firestore().collection('Users').doc(id);
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
        password: password,
      };

      await userRef.set(user);
      console.log('STarted', user);
      return user;
    } catch (error) {
      console.log(error);
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
      console.log(noticeData, 'BHSDK');
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

// method to get all the complaints
export const getAllComplaints = createAsyncThunk(
  'user/getAllComplaints',
  async (_, {rejectWithValue}) => {
    try {
      const complaintsRef = firestore().collection('complaints');
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
      const complaintsRef = firestore().collection('notice');
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

export const createMember = createAsyncThunk(
  'user/createMember',
  async ({name, type, number, image}: any, {rejectWithValue}) => {
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
      const complaintsRef = firestore().collection('complaints');
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
  currentUser: -1,
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
      state.imageUrl = payload.imageUrl;
      state.phoneNumber = payload.phoneNumber;

      state.complaints = payload.complaints;
      state.isAdmin = payload.isAdmin;
      state.isAOA = payload.isAOA;
      state.isTenantAdded = payload.isTenantAdded;
      state.currentUser = payload.currentUser;

      if (payload.isTenantAdded) {
        state.tenantName = payload.tenantName;
        state.tenantEmail = payload.tenantEmail;
        state.tenantPhoneNumber = payload.tenantPhoneNumber;
      }
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
      state.phoneNumber = action.payload.phoneNumber;

      state.complaints = action.payload.complaints;
      state.isAdmin = action.payload.isAdmin;
      state.isAOA = action.payload.isAOA;
      state.isTenantAdded = action.payload.isTenantAdded;
      state.currentUser = action.payload.currentUser;
      if (action.payload.isTenantAdded) {
        state.tenantName = action.payload.tenantName;
        state.tenantEmail = action.payload.tenantEmail;
        state.tenantPhoneNumber = action.payload.tenantPhoneNumber;
      }
      state.error = null;
      storeData(userDataSKeys, state);
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
      // state.id = action.payload.id;
      // state.block = action.payload.block;
      // state.flatNumber = action.payload.flatNumber;
      // state.ownerName = action.payload.ownerName;
      // state.flatType = action.payload.flatType;
      // state.phoneNumber = action.payload.phoneNumber;
      // state.complaints = action.payload.complaints;
      // state.isAdmin = action.payload.isAdmin;
      // state.isAOA = action.payload.isAOA;
      // state.error = null;
      // Utils.storeData(Utils.userDataSKeys, state);
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
      console.log(action.payload, 'HAHAHAHA');
      state.notice = action.payload;
    });
    builder.addCase(getAllNotice.rejected, (state, action) => {
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
      console.log(action.payload, 'HAHAHAHA');
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
  },
});

export const {loginUser, logout} = userSlice.actions;

export default userSlice.reducer;
