import { toast } from "react-hot-toast";
import {
  PostUploadData,
  PlacePost,
  UpdatedReview,
  PlaceData,
  MyPosts,
} from "../types/types";
import { axiosBase } from "./axios";

export const getAllPostsByPlaceId = async (id: number): Promise<PlaceData> => {
  const response = await axiosBase.get<PlaceData>(`/v1/places/${id}/posts`);
  return response.data;
};

export const getMyPosts = async (): Promise<MyPosts[]> => {
  const response = await axiosBase.get<MyPosts[]>("/v1/posts/me");
  return response.data;
};

export const uploadPost = async (
  data: PostUploadData
): Promise<PostUploadData> => {
  const response = await axiosBase.post<PostUploadData>("v1/posts", data);
  const newPosting = response.data;

  return newPosting;
};

export const updatePost = async (
  postId: number,
  post: UpdatedReview
): Promise<PlacePost> => {
  const data = {
    post_star_rating: post.post_star_rating,
    post_description: post.post_description,
  };

  const response = await axiosBase.patch<PlacePost>(
    `/v1/posts/${postId}`,
    data
  );
  const updatedPost = response.data;
  return updatedPost;
};

export const deletePost = async (id: number): Promise<void> => {
  await axiosBase.delete(`/v1/posts/${id}`);
};

export const getPlacesBySearchQuery = async (
  query: string,
  x: number,
  y: number
) => {
  try {
    const response = await axiosBase.get(
      `v1/places/search?query=${query}&x=${x}&y=${y}`
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.detail);
  }
};
