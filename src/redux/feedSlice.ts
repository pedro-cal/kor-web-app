import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppError } from '../types/globalTypes';
import {
  IFeedState,
  IStatusPost,
  ISubmitPostPayload,
} from '../types/feedTypes';

const initialState: IFeedState = {
  posts: [],
  isLoading: false,
  error: undefined,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
    //@ts-expect-error-redux issue with action to be made available only for SAGA
   fetchPosts: (state, action: PayloadAction<{ id: string }>) => { // eslint-disable-line
      state.isLoading = true;
    },
    fetchPostsSuccess: (state, action: PayloadAction<IStatusPost[]>) => {
      state.posts = [...action.payload];
      state.isLoading = false;
    },
    fetchPostsFail: (state, action: PayloadAction<IAppError>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //@ts-expect-error-redux issue with action to be made available only for SAGA
   submitPost: (state, action: PayloadAction<ISubmitPostPayload>) => { // eslint-disable-line
      state.isLoading = true;
    },
    submitPostSuccess: state => {
      state.isLoading = false;
    },
    submitPostFail: (state, action: PayloadAction<IAppError>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  clearPosts,
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsFail,
  submitPost,
  submitPostSuccess,
  submitPostFail,
} = feedSlice.actions;
export default feedSlice.reducer;
