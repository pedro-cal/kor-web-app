// src/app/reducers.ts
import { combineReducers } from '@reduxjs/toolkit';
import globalSlice from './globalSlice';
import userListSlice from './userListSlice';
import feedSlice from './feedSlice';

const rootReducer = combineReducers({
  global: globalSlice,
  userList: userListSlice,
  feed: feedSlice,
});

export default rootReducer;
