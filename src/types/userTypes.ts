import { IAppError } from "./globalTypes";

export interface IUser {
   id: string;
   username?: string;
   email?: string;
   status?: string;
   imgUrl?: string;
}

export interface IUserListState {
   users: IUser[];
   isLoading: boolean;
   error: IAppError | undefined;
 }