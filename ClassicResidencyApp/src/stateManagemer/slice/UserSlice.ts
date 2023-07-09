// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';
// import URLManager from '../../networkLayer/URLManager';
// import {Alert} from 'react-native';

// // import {UserType, OrderType, AddOrderType} from '../models/UserProfileModel';
// import {
//   ComplaintType,
//   FlatType,
//   Members,
//   Notice,
// } from '../models/SocietyAppModal';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
// // import {Utils} from '../../resources';

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
//       const complaintsRef = firestore().collection('notices');
//       const snapshot = await complaintsRef.get();
//       // const complaints = snapshot.docs.map(doc => doc.data());
//       const complaints: Notice[] = snapshot.docs.map(
//         doc => doc.data() as Notice,
//       );
//       return complaints;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
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
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginUser: (state, {payload}: PayloadAction<FlatType>) => {
//       console.log(payload, 'INside slice');
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
//       Utils.clearAll();
//     },
//     addToCart: (state, {payload}: PayloadAction<AddOrderType>) => {
//       // console.log(payload);
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(login.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         console.log(action.payload, 'HHHHHHHH');
//         state.loading = false;
//         state.id = action.payload.id;
//         state.block = action.payload.block;
//         state.flatNumber = action.payload.flatNumber;
//         state.ownerName = action.payload.ownerName;
//         state.flatType = action.payload.flatType;
//         state.phoneNumber = action.payload.phoneNumber;
//         state.complaints = action.payload.complaints;
//         state.isAdmin = action.payload.isAdmin;
//         state.isAOA = action.payload.isAOA;
//         state.error = null;
//         Utils.storeData(Utils.userDataSKeys, state);
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
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
//   },
// });

// export const {loginUser, logout, addToCart} = userSlice.actions;

// export default userSlice.reducer;
