import { IFeedState } from './feedTypes';
import { IUser, IUserListState } from './userTypes';

export interface IAppError {
  message: string;
}

export interface IGlobalState {
  currentUser: IUser | undefined;
  isLoading: boolean;
  error: IAppError | undefined;
}
export interface IRootState {
  global: IGlobalState;
  userList: IUserListState;
  feed: IFeedState;
}
