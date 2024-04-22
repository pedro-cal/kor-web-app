import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/userTypes';
import { IAppError, IGlobalState } from '../types/globalTypes';


const initialState: IGlobalState = {
  currentUser: undefined,
  isLoading: false,
  error: undefined,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = undefined;
    },
    //eslint-disable-next-line
      signUser: (state, _action: PayloadAction<{ username?: string; email?: string; imgUrl?: string }>) => {
        state.isLoading = true;
      },
      signUserSuccess: (state, action: PayloadAction<IUser>) => {
         state.currentUser = action.payload;
         state.isLoading = false;
      },
      signUserFail: (state, action: PayloadAction<IAppError>) => {
         state.isLoading = false;
         state.error = action.payload
       },
  },
});

export const { signUser, signUserSuccess, signUserFail, clearCurrentUser } = globalSlice.actions;
export default globalSlice.reducer;
