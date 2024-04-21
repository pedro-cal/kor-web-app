import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserListState, IUser } from '../types/userTypes';


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
     },
  },
});

export const { fetchAllUsers, fetchAllUsersSuccess } = userListSlice.actions;
export default userListSlice.reducer;
