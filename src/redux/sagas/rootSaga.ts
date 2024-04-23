// src/app/sagas.ts
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchAllUsersSuccess,
  fetchFriendsSuccess,
  requestConnectionFail,
  requestConnectionSuccess,
  submitStatusFail,
  submitStatusSuccess,
} from '../userListSlice';
import { IConnectionPayload, IFriendship, IUser } from '../../types/userTypes';
import {
  fetchAllUsersApi,
  fetchFriendsApi,
  requestConnectionApi,
  signUserApi,
  submitStatusApi,
} from '../../api/usersApi';
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

function* onRequestConnection(action: PayloadAction<IConnectionPayload>) {
  try {
    const payload = action.payload;
    const newConnection: IFriendship = yield call(
      requestConnectionApi,
      payload
    );
    const userFriends: IFriendship[] = yield call(
      fetchFriendsApi,
      payload.inviterId
    );
    yield put(fetchFriendsSuccess(userFriends));
    yield put(requestConnectionSuccess(newConnection));
  } catch (err) {
    const appErr = { message: (err as Error).message };
    yield put(requestConnectionFail(appErr));
  }
}

function* onSubmitStatus(
  action: PayloadAction<{ status: string; id: string }>
) {
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
    const appErr = { message: (err as Error).message };
    yield put(submitStatusFail(appErr));
  }
}

function* onSignUser(
  action: PayloadAction<{ username?: string; email?: string; imgUrl?: string }>
) {
  try {
    const { payload } = action;
    const user: IUser = yield call(signUserApi, payload);
    const { id } = user;
    if (id) {
      const userFriends: [] = yield call(fetchFriendsApi, id);
      yield put(fetchFriendsSuccess(userFriends));
    }
    yield put(signUserSuccess(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (err) {
    const appErr = { message: (err as Error).message };
    yield put(signUserFail(appErr));
  }
}

function* watchFetchUsers() {
  yield takeLatest('userList/fetchAllUsers', onFetchAllUsers);
}
function* watchSubmitStatus() {
  yield takeLatest('userList/submitStatus', onSubmitStatus);
}
function* watchRequestConnection() {
  yield takeLatest('userList/requestConnection', onRequestConnection);
}
function* watchSignUser() {
  yield takeLatest('global/signUser', onSignUser);
}

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchSignUser(),
    watchSubmitStatus(),
    watchRequestConnection(),
  ]);
}
