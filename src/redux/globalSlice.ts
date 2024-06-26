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
    initialAppLoader: () => {},
    initialAppLoaderSuccess: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: state => {
      state.currentUser = undefined;
      localStorage.removeItem('currentUser');
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
      state.error = action.payload;
    },
  },
});

export const {
  signUser,
  signUserSuccess,
  signUserFail,
  clearCurrentUser,
  initialAppLoader,
  initialAppLoaderSuccess,
} = globalSlice.actions;
export default globalSlice.reducer;
