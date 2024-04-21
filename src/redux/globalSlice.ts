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
     signUserIn: (state) => {
        state.isLoading = true;
      },
      signUserInSuccess: (state, action: PayloadAction<IUser>) => {
         state.currentUser = action.payload;
         state.isLoading = false;
      },
      signUserInFail: (state, action: PayloadAction<IAppError>) => {
         state.isLoading = false;
         state.error = action.payload
       },
  },
});

export const { signUserIn, signUserInSuccess } = globalSlice.actions;
export default globalSlice.reducer;
