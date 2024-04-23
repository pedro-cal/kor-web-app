import { AxiosResponse } from 'axios';
import axiosInstance from './axios';
import { IAppError } from '../types/globalTypes';
import { ISubmitPostPayload, IStatusPost } from '../types/feedTypes';

export const fetchPostsApi = async (id: string): Promise<IStatusPost[]> => {
  try {
    const response: AxiosResponse<IStatusPost[]> = await axiosInstance.get(
      `/api/posts/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error((error as IAppError).message || 'Failed to fetch posts');
  }
};

export const submitPostApi = async (
  payload: ISubmitPostPayload
): Promise<IStatusPost> => {
  try {
    const body = payload;
    const response: AxiosResponse<IStatusPost> = await axiosInstance.post(
      `/api/posts`,
      body
    );
    return response.data;
  } catch (error) {
    throw new Error((error as IAppError).message || 'Failed to fetch users');
  }
};
