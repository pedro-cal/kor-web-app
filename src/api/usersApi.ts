import { AxiosResponse } from "axios";
import { IUser } from "../types/userTypes";
import axiosInstance from "./axios";
import { IAppError } from "../types/globalTypes";

export const fetchAllUsersApi = async (): Promise<IUser[]> => {
   try {
     const response: AxiosResponse<{ users: IUser[] }> = await axiosInstance.get('/api/users');
     return response.data.users;  // Adjust depending on the actual API response structure
   } catch (error) {
     throw new Error((error as IAppError).message || "Failed to fetch users");
   }
 }