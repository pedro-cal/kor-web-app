// src/app/sagas.ts
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchAllUsersSuccess, submitStatusFail, submitStatusSuccess } from '../userListSlice';
import { IUser } from '../../types/userTypes';
import { fetchAllUsersApi, signUserApi, submitStatusApi } from '../../api/usersApi';
import { signUserFail, signUserSuccess } from '../globalSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* onFetchAllUsers() {
  try {
    const users: IUser[] = yield call(fetchAllUsersApi);
    yield put(fetchAllUsersSuccess(users));
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
}
function* onSubmitStatus(action: PayloadAction<{ status: string, id: string }>) {
  try {
    const payload = action.payload;
    const updatedUser: IUser = yield call(submitStatusApi, payload);
    yield put(signUserSuccess(updatedUser));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    if (updatedUser.id) {
      const users: IUser[] = yield call(fetchAllUsersApi);
      yield put(fetchAllUsersSuccess(users));
    }
    yield put(submitStatusSuccess());
  } catch (err) {
    const appErr = { message: (err as Error).message }
    yield put(submitStatusFail(appErr));
  }
}

function* onSignUser(action: PayloadAction<{ username?: string, email?: string, imgUrl?: string }>) {
   try {
   const { payload } = action;
    const user: IUser = yield call(signUserApi, payload);
    yield put(signUserSuccess(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (err) {
    const appErr = { message: (err as Error).message }
    yield put(signUserFail(appErr));
  }
}

function* watchFetchUsers() {
  yield takeLatest('userList/fetchAllUsers', onFetchAllUsers);
}
function* watchSubmitStatus() {
  yield takeLatest('userList/submitStatus', onSubmitStatus);
}
function* watchSignUser() {
  yield takeLatest('global/signUser', onSignUser);
}

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchSignUser(),
    watchSubmitStatus(),
  ]);
}
