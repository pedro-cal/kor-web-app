import { IUser } from '../types/userTypes';

export function getCurrentUser(stateUser: IUser | undefined) {
  const localUser = localStorage.getItem('currentUser');
  const currentUser = localUser ? JSON.parse(localUser) : stateUser;
  return currentUser;
}
