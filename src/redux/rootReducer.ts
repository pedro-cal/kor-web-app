// src/app/reducers.ts
import { combineReducers } from '@reduxjs/toolkit';
import globalSlice from './globalSlice';
import userListSlice from './userListSlice';

const rootReducer = combineReducers({
  global: globalSlice,
  userList: userListSlice,
});

export default rootReducer;
