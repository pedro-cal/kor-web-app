import { IAppError } from './globalTypes';
import { IUser } from './userTypes';

export interface IStatusPost {
  id: string;
  createdAt: string;
  statusText: string;
  user: IUser;
}

export interface IFeedState {
  posts: IStatusPost[];
  isLoading: boolean;
  error: IAppError | undefined;
}

export interface ISubmitPostPayload {
  userId: string;
  statusText: string;
}
