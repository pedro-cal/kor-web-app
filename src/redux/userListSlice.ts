import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IUserListState,
  IUser,
  IStatusPayload,
  IFriendship,
  IConnectionPayload,
  IRespondRequestPayload,
} from '../types/userTypes';
import { IAppError } from '../types/globalTypes';

const initialState: IUserListState = {
  users: [],
  friends: [],
  newConnection: undefined,
  isLoading: false,
  error: undefined,
};

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    fetchAllUsers: state => {
      state.isLoading = true;
    },
    fetchAllUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.users = [...action.payload];
      state.isLoading = false;
    },
    //@ts-expect-error-redux issue with action to be made available only for SAGA
      fetchFriends: (state, action: PayloadAction<{currentUserId: string}>) => { //eslint-disable-line
      state.isLoading = true;
    },
    fetchFriendsSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.friends = [...action.payload];
      state.isLoading = false;
    },
    //@ts-expect-error-redux issue with action to be made available only for SAGA
      requestConnection: (state, action: PayloadAction<IConnectionPayload>) => { //eslint-disable-line
      state.isLoading = true;
    },
    requestConnectionSuccess: (state, action: PayloadAction<IFriendship>) => {
      state.newConnection = action.payload;
      state.isLoading = false;
    },
    requestConnectionFail: (state, action: PayloadAction<IAppError>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //@ts-expect-error-redux issue with action to be made available only for SAGA
    submitStatus: (state, action: PayloadAction<IStatusPayload>) => { //eslint-disable-line
      state.isLoading = true;
    },
    submitStatusSuccess: state => {
      state.isLoading = false;
    },
    submitStatusFail: (state, action: PayloadAction<IAppError>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //@ts-expect-error-redux issue with action to be made available only for SAGA
    respondRequest: (state, action: PayloadAction<IRespondRequestPayload>) => { //eslint-disable-line
      state.isLoading = true;
    },
    respondRequestSuccess: state => {
      state.isLoading = false;
    },
    respondRequestFail: (state, action: PayloadAction<IAppError>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchAllUsers,
  fetchAllUsersSuccess,
  submitStatus,
  submitStatusSuccess,
  submitStatusFail,
  requestConnection,
  requestConnectionSuccess,
  requestConnectionFail,
  fetchFriends,
  fetchFriendsSuccess,
  respondRequest,
  respondRequestSuccess,
  respondRequestFail,
} = userListSlice.actions;
export default userListSlice.reducer;
