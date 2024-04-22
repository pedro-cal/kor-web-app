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

export const fetchFriendsApi = async (id: string): Promise<[]> => {
   try {
     const response: AxiosResponse<[]> = await axiosInstance.get(`/api/friend/${id}`);
     return response.data;
   } catch (error) {
     throw new Error((error as IAppError).message || "Failed to fetch friends");
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

 export const requestConnectionApi = async (payload: {inviterId: string, inviteeId: string}): Promise<IUser> => {
   try {
    const {inviterId, inviteeId} = payload;
    const body = { inviterId, inviteeId };
     const response: AxiosResponse<IUser> = await axiosInstance.post(`/api/friend`, body);
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