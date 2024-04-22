// src/app/sagas.ts
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchAllUsersSuccess } from '../userListSlice';
import { IUser } from '../../types/userTypes';
import { fetchAllUsersApi, signUserApi } from '../../api/usersApi';
import { signUserSuccess } from '../globalSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* onFetchAllUsers() {
  try {
    const users: IUser[] = yield call(fetchAllUsersApi);
    yield put(fetchAllUsersSuccess(users));
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
}

function* onSignUser(action: PayloadAction<{ username?: string, email?: string, imgUrl?: string }>) {
   try {
   const { payload } = action;
   console.log("🚀 ~ function*onSignUser ~ payload:", payload)
    const user: IUser = yield call(signUserApi, payload);
    yield put(signUserSuccess(user));
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
}

function* watchFetchUsers() {
  yield takeLatest('userList/fetchAllUsers', onFetchAllUsers);
}
function* watchSignUser() {
  yield takeLatest('global/signUser', onSignUser);
}

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchSignUser(),
  ]);
}
