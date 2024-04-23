// src/app/sagas.ts
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchAllUsers,
  fetchAllUsersSuccess,
  fetchFriendsSuccess,
  requestConnectionFail,
  requestConnectionSuccess,
  respondRequestSuccess,
  submitStatusFail,
  submitStatusSuccess,
} from '../userListSlice';
import {
  IConnectionPayload,
  IFriendship,
  IRespondRequestPayload,
  IUser,
} from '../../types/userTypes';
import {
  fetchAllUsersApi,
  fetchFriendsApi,
  requestConnectionApi,
  respondRequestApi,
  signUserApi,
  submitStatusApi,
} from '../../api/usersApi';
import {
  initialAppLoaderSuccess,
  signUserFail,
  signUserSuccess,
} from '../globalSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchPostsApi, submitPostApi } from '../../api/feedApi';
import { ISubmitPostPayload, IStatusPost } from '../../types/feedTypes';
import { fetchPosts, fetchPostsFail, fetchPostsSuccess } from '../feedSlice';

function* onInitialAppLoader() {
  try {
    const localUser = localStorage.getItem('currentUser');
    const currentUser = localUser ? JSON.parse(localUser) : false;
    if (currentUser?.id) {
      yield put(initialAppLoaderSuccess(currentUser));
      const userFriends: IFriendship[] = yield call(
        fetchFriendsApi,
        currentUser.id
      );
      yield put(fetchFriendsSuccess(userFriends));
    }
    yield put(fetchAllUsers());
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
}

function* onFetchAllUsers() {
  try {
    const users: IUser[] = yield call(fetchAllUsersApi);
    yield put(fetchAllUsersSuccess(users));
    const localUser = localStorage.getItem('currentUser');
    const currentUser = localUser ? JSON.parse(localUser) : false;
    if (currentUser?.id) {
      const userFriends: IFriendship[] = yield call(
        fetchFriendsApi,
        currentUser.id
      );
      yield put(fetchFriendsSuccess(userFriends));
    }
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

function* onRespondRequest(action: PayloadAction<IRespondRequestPayload>) {
  try {
    const payload = action.payload;
    yield call(respondRequestApi, payload);
    yield put(fetchAllUsers());

    yield put(respondRequestSuccess());
  } catch (err) {
    const appErr = { message: (err as Error).message };
    yield put(submitStatusFail(appErr));
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
      yield put(fetchPosts({ id }));
    }
    yield put(signUserSuccess(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (err) {
    const appErr = { message: (err as Error).message };
    yield put(signUserFail(appErr));
  }
}

function* onFetchPosts(action: PayloadAction<{ id: string }>) {
  try {
    const payload = action.payload;
    const posts: IStatusPost[] = yield call(fetchPostsApi, payload.id);
    const sortedPosts = posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    yield put(fetchPostsSuccess(sortedPosts));
  } catch (err) {
    const appErr = { message: (err as Error).message };
    yield put(fetchPostsFail(appErr));
  }
}

function* onSubmitPost(action: PayloadAction<ISubmitPostPayload>) {
  try {
    const payload = action.payload;
    yield call(submitPostApi, payload);
    yield put(fetchPosts({ id: payload.userId }));
  } catch (err) {
    const appErr = { message: (err as Error).message };
    yield put(fetchPostsFail(appErr));
  }
}

function* watchInitialAppLoader() {
  yield takeLatest('global/initialAppLoader', onInitialAppLoader);
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
function* watchRespondRequest() {
  yield takeLatest('userList/respondRequest', onRespondRequest);
}
function* watchSignUser() {
  yield takeLatest('global/signUser', onSignUser);
}
function* watchFetchPosts() {
  yield takeLatest('feed/fetchPosts', onFetchPosts);
}
function* watchSubmitPost() {
  yield takeLatest('feed/submitPost', onSubmitPost);
}

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchSignUser(),
    watchSubmitStatus(),
    watchRequestConnection(),
    watchRespondRequest(),
    watchFetchPosts(),
    watchSubmitPost(),
    watchInitialAppLoader(),
  ]);
}
