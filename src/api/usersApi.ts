import { AxiosResponse } from "axios";
import { IUser } from "../types/userTypes";
import axiosInstance from "./axios";
import { IAppError } from "../types/globalTypes";

export const fetchAllUsersApi = async (): Promise<IUser[]> => {
   try {
     const response: AxiosResponse<IUser[]> = await axiosInstance.get('/api/user');
     return response.data;
   } catch (error) {
     throw new Error((error as IAppError).message || "Failed to fetch users");
   }
 }