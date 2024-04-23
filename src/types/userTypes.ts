import { IAppError } from './globalTypes';

export interface IUser {
  id: string;
  username?: string;
  email?: string;
  status?: string;
  imgUrl?: string;
  friendStatus?: string;
  isInviter?: boolean;
}
export interface IFriendship {
  id: string;
  inviterId: string;
  inviteeId: string;
  status: string;
}

export interface IUserListState {
  users: IUser[];
  friends: IUser[];
  newConnection: IFriendship | undefined;
  isLoading: boolean;
  error: IAppError | undefined;
}

export interface IStatusPayload {
  id: string;
  status: string | undefined;
}

export interface IConnectionPayload {
  inviterId: string;
  inviteeId: string;
}

export interface IRespondRequestPayload extends IConnectionPayload {
  status: string;
}
