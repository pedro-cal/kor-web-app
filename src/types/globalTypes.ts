import { IUser } from "./userTypes";

export interface IAppError {
   message: string;
}

export interface IGlobalState {
   currentUser: IUser | undefined,
   isLoading: boolean,
   error: IAppError | undefined,
}