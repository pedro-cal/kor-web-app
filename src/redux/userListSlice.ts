import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserListState, IUser, IStatusPayload } from '../types/userTypes';
import { IAppError } from '../types/globalTypes';


const initialState: IUserListState = {
  users: [],
  isLoading: false,
  error: undefined,
};

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
      fetchAllUsers: (state) => {
       state.isLoading = true;
     },
      fetchAllUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
       state.users = [...action.payload];
       state.isLoading = false;
     },
     //@ts-expect-error-redux issue with action to be made available only for
      submitStatus: (state, action: PayloadAction<IStatusPayload>) => { //eslint-disable-line
       state.isLoading = true;
     },
      submitStatusSuccess: (state) => {
       state.isLoading = false;
     },
      submitStatusFail: (state, action: PayloadAction<IAppError>) => {
       state.error = action.payload;
       state.isLoading = false;
     },
  },
});

export const { fetchAllUsers, fetchAllUsersSuccess, submitStatus, submitStatusSuccess, submitStatusFail } = userListSlice.actions;
export default userListSlice.reducer;
