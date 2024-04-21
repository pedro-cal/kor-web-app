// src/app/sagas.ts
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchAllUsersSuccess } from '../userListSlice';
import { IUser } from '../../types/userTypes';
import { fetchAllUsersApi } from '../../api/usersApi';

function* fetchExampleData() {
  try {
    const res: { users: IUser[] } = yield call(fetchAllUsersApi);
    yield put(fetchAllUsersSuccess(res.users));
  } catch (e) {
    console.error('Failed to fetch data', e);
  }
}

function* watchFetchUsers() {
  yield takeLatest('fetchAllUsers', fetchExampleData);
}

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
  ]);
}
