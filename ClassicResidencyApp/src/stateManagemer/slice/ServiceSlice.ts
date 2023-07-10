// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';
// import {Alert} from 'react-native';
// import {
//   AddedMember,
//   ComplaintType,
//   FlatType,
//   Members,
//   Notice,
// } from '../models/SocietyAppModal';
// // import firestore from '@react-native-firebase/firestore';
// // import {uploadImageToFirebase} from '../../resources/Utils';

// // method for userlogin
// export const login = createAsyncThunk(
//   'user/login',
//   async (
//     {phoneNumber, password}: {phoneNumber: string; password: string},
//     {rejectWithValue},
//   ) => {
//     try {
//       console.log('inside');
//       const flatsRef = firestore().collection('Users');
//       const snapshot = await flatsRef
//         .where('phoneNumber', '==', phoneNumber)
//         .where('password', '==', password)
//         .get();

//       if (snapshot.empty) {
//         Alert.alert('Error', 'Invalid phone number or password');
//         throw new Error('Invalid phone number or password');
//       }
//       const user = snapshot.docs[0].data();
//       const {id} = user;
//       return user;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// // Method for user creation
// export const createUser = createAsyncThunk(
//   'user/createUser',
//   async (
//     {
//       flatNumber,
//       flatType,
//       block,
//       name,
//       email,
//       phoneNumber,
//     }: {
//       flatNumber: string;
//       flatType: string;
//       block: string;
//       name: string;
//       email: string;
//       phoneNumber: string;
//     },
//     {rejectWithValue},
//   ) => {
//     try {
//       console.log('STarted');
//       const id = block + flatType + flatNumber;
//       const userRef = firestore().collection('Users').doc(id);
//       const password = await phoneNumber.split('').reverse().join('');
//       const user: AddedMember = {
//         id: id,
//         block: block,
//         flatType: flatType,
//         flatNumber: flatNumber,
//         ownerName: name,
//         phoneNumber: phoneNumber,
//         email: email,
//         imageUrl: '',
//         complaints: [],
//         isTenantAdded: false,
//         isAdmin: false,

//         isAOA: false,
//         password: password,
//       };

//       await userRef.set(user);
//       console.log('STarted', user);
//       return user;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error?.message);
//     }
//   },
// );
// export const createNotice = createAsyncThunk(
//   'user/createNotice',
//   async ({title, des, subject, user, image}: any, {rejectWithValue}) => {
//     try {
//       let imageurl = '';
//       if (image) imageurl = (await uploadImageToFirebase(image)) ?? '';
//       const noticeData: Notice = {
//         id: title + Date.now(),
//         title: title,
//         description: des,
//         subject: subject,
//         createdAt: new Date().toLocaleDateString(),
//         createdBy: user,
//         imageUrl: imageurl,
//       };

//       const noticesCollectionRef = firestore()
//         .collection('notice')
//         .doc(title + Date.now());
//       await noticesCollectionRef.set(noticeData);
//       return noticeData;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error?.message);
//     }
//   },
// );

// export const createComplaint = createAsyncThunk(
//   'user/createNotice',
//   async ({title, des, subject, user, image}: any, {rejectWithValue}) => {
//     try {
//       let imageurl = '';
//       if (image) imageurl = (await uploadImageToFirebase(image)) ?? '';
//       const noticeData: Notice = {
//         id: title + Date.now(),
//         title: title,
//         description: des,
//         subject: subject,
//         createdAt: new Date().toLocaleDateString(),
//         createdBy: user,
//         imageUrl: imageurl,
//       };

//       const noticesCollectionRef = firestore()
//         .collection('notice')
//         .doc(title + Date.now());
//       await noticesCollectionRef.set(noticeData);
//       return noticeData;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error?.message);
//     }
//   },
// );

// // method to get all the complaints
// export const getAllComplaints = createAsyncThunk(
//   'user/getAllComplaints',
//   async (_, {rejectWithValue}) => {
//     try {
//       const complaintsRef = firestore().collection('complaints');
//       const snapshot = await complaintsRef.get();
//       // const complaints = snapshot.docs.map(doc => doc.data());
//       const complaints: ComplaintType[] = snapshot.docs.map(
//         doc => doc.data() as ComplaintType,
//       );
//       return complaints;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );
// export const getAllNotice = createAsyncThunk(
//   'user/getAllNotice',
//   async (_, {rejectWithValue}) => {
//     try {
//       const complaintsRef = firestore().collection('notice');
//       const snapshot = await complaintsRef.get();
//       const complaints: Notice[] = snapshot.docs.map(
//         doc => doc.data() as Notice,
//       );
//       return complaints;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// export const createMember = createAsyncThunk(
//   'user/createMember',
//   async ({name, type, number, image}: any, {rejectWithValue}) => {
//     try {
//       const existingMember = await firestore()
//         .collection('members')
//         .where('phoneNumber', '==', number)
//         .get();

//       if (!existingMember.empty) {
//         const errorMessage = 'Member with this phone number already exists.';
//         console.log(errorMessage);
//         Alert.alert('Error', errorMessage);
//         return rejectWithValue(errorMessage);
//       }

//       let imageurl = '';
//       if (image) imageurl = (await uploadImageToFirebase(image)) ?? '';
//       const memberData: Members = {
//         imageUrl: imageurl,
//         name: name,
//         phoneNumber: number,
//         type: type,
//         assignedComplaints: [],
//       };

//       const memberCollectionRef = firestore()
//         .collection('members')
//         .doc(name + Date.now());
//       await memberCollectionRef.set(memberData);
//       return memberData;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error?.message);
//     }
//   },
// );
// export const getAllMembers = createAsyncThunk(
//   'user/getAllMembers',
//   async (_, {rejectWithValue}) => {
//     try {
//       const complaintsRef = firestore().collection('members');
//       const snapshot = await complaintsRef.get();
//       // const complaints = snapshot.docs.map(doc => doc.data());
//       const complaints: Members[] = snapshot.docs.map(
//         doc => doc.data() as Members,
//       );
//       return complaints;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );
// export const getComplaintsById = createAsyncThunk(
//   'user/getComplaintsById',
//   async ({currentUserId}: {currentUserId: string}, {rejectWithValue}) => {
//     try {
//       const complaintsRef = firestore().collection('complaints');
//       const snapshot = await complaintsRef.get();
//       // const complaints = snapshot.docs.map(doc => doc.data());
//       let complaints: ComplaintType[] = snapshot.docs.map(
//         doc => doc.data() as ComplaintType,
//       );
//       complaints = complaints.filter(item => item.flatId === currentUserId);
//       return complaints;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// const initialState: FlatType = {
//   password: '',
//   id: '',
//   block: '',
//   flatNumber: '',
//   ownerName: '',
//   flatType: '',
//   phoneNumber: '',
//   complaints: [],
//   adminComplaints: [],
//   notice: [],
//   isAdmin: false,
//   isAOA: false,
//   loading: false,
//   error: null,
//   members: [],
//   email: '',
//   imageUrl: '',
//   isTenantAdded: false,
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginUser: (state, {payload}: PayloadAction<FlatType>) => {
//       state.id = payload.id;
//       state.block = payload.block;
//       state.flatNumber = payload.flatNumber;
//       state.ownerName = payload.ownerName;
//       state.flatType = payload.flatType;
//       state.phoneNumber = payload.phoneNumber;
//       state.complaints = payload.complaints;
//       state.adminComplaints = payload.adminComplaints;
//       state.isAdmin = payload.isAdmin;
//       state.isAdmin = payload.isAdmin;
//     },
//     logout: state => {
//       console.log('here');
//       state.id = '';
//       state.block = '';
//       state.flatNumber = '';
//       state.ownerName = '';
//       state.flatType = '';
//       state.phoneNumber = '';
//       state.complaints = [];
//       state.isAdmin = false;
//       // Utils.clearAll();
//     },
//   },
//   extraReducers: builder => {
//     builder.addCase(login.pending, state => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(login.fulfilled, (state, action) => {
//       console.log(action.payload, 'HHHHHHHH');
//       state.loading = false;
//       state.id = action.payload.id;
//       state.block = action.payload.block;
//       state.flatType = action.payload.flatType;
//       state.flatNumber = action.payload.flatNumber;
//       state.ownerName = action.payload.ownerName;
//       state.password = action.payload.password;
//       state.imageUrl = action.payload.imageUrl;
//       state.phoneNumber = action.payload.phoneNumber;

//       state.complaints = action.payload.complaints;
//       state.isAdmin = action.payload.isAdmin;
//       state.isAOA = action.payload.isAOA;
//       state.isTenantAdded = action.payload.isTenantAdded;

//       if (action.payload.isTenantAdded) {
//         state.tenantName = action.payload.tenantName;
//         state.tenantEmail = action.payload.tenantEmail;
//         state.tenantPhoneNumber = action.payload.tenantPhoneNumber;
//       }
//       state.error = null;
//       // Utils.storeData(Utils.userDataSKeys, state);
//     });
//     builder.addCase(login.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     builder.addCase(createUser.pending, state => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(createUser.fulfilled, (state, action) => {
//       state.loading = false;
//       // state.id = action.payload.id;
//       // state.block = action.payload.block;
//       // state.flatNumber = action.payload.flatNumber;
//       // state.ownerName = action.payload.ownerName;
//       // state.flatType = action.payload.flatType;
//       // state.phoneNumber = action.payload.phoneNumber;
//       // state.complaints = action.payload.complaints;
//       // state.isAdmin = action.payload.isAdmin;
//       // state.isAOA = action.payload.isAOA;
//       // state.error = null;
//       // Utils.storeData(Utils.userDataSKeys, state);
//     });
//     builder.addCase(createUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     // Complaints
//     builder.addCase(getAllComplaints.pending, state => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getAllComplaints.fulfilled, (state, action) => {
//       state.loading = false;
//       state.error = null;
//       state.adminComplaints = action.payload;
//     });
//     builder.addCase(getAllComplaints.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     builder.addCase(getComplaintsById.pending, state => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getComplaintsById.fulfilled, (state, action) => {
//       state.loading = false;
//       state.error = null;
//       console.log(action.payload, 'HAHAHAHA');
//       state.complaints = action.payload;
//     });
//     builder.addCase(getComplaintsById.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     // Notices
//     builder.addCase(getAllNotice.pending, state => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getAllNotice.fulfilled, (state, action) => {
//       state.loading = false;
//       state.error = null;
//       console.log(action.payload, 'HAHAHAHA');
//       state.notice = action.payload;
//     });
//     builder.addCase(getAllNotice.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     builder.addCase(createNotice.pending, state => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(createNotice.fulfilled, (state, action) => {
//       state.loading = false;
//       Alert.alert('Success', 'Notice created successfully');
//       state.notice = [action.payload, ...state.notice];
//     });
//     builder.addCase(createNotice.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     // Members
//     builder.addCase(getAllMembers.pending, state => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getAllMembers.fulfilled, (state, action) => {
//       state.loading = false;
//       state.error = null;
//       console.log(action.payload, 'HAHAHAHA');
//       state.members = action.payload;
//     });

//     builder.addCase(getAllMembers.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     builder.addCase(createMember.pending, state => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(createMember.fulfilled, (state, action) => {
//       state.loading = false;
//       Alert.alert('Success', 'Notice created successfully');
//       // state.notice = [action.payload, ...state.notice];
//     });
//     builder.addCase(createMember.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
// });

// export const {loginUser, logout} = userSlice.actions;

// export default userSlice.reducer;
