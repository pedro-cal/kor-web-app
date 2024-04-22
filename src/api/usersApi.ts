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

export const submitStatusApi = async (payload: {id: string, status: string}): Promise<IUser> => {
   try {
    const {id, status} = payload;
    const body = { status };
     console.log("🚀 ~ API submitStatusApi ~ payload:", payload)
     const response: AxiosResponse<IUser> = await axiosInstance.put(`/api/user/status/${id}`, body);
     return response.data;
   } catch (error) {
     throw new Error((error as IAppError).message || "Failed to fetch users");
   }
 }

export const signUserApi = async (data: { username?: string, email?: string, imgUrl?: string}): Promise<IUser> => {
   try {
     const response: AxiosResponse<IUser> = await axiosInstance.post('/api/user', data);
     return response.data;
   } catch (error) {
     throw new Error((error as IAppError).message || "Failed to fetch users");
   }
 }