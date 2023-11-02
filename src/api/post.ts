import {
  PostUploadData,
  PlacePost,
  UpdatedReview,
  PlaceData,
  ResponsePostUploadData,
  PostResponse,
} from "../types/types";
import { axiosBase } from "./axios";

export const getAllPostsByPlaceId = async (id: number): Promise<PlaceData> => {
  const response = await axiosBase.get<PlaceData>(`/v1/places/${id}/posts`);
  return response.data;
};

export const getMyPosts = async (): Promise<PostResponse[]> => {
  const response = await axiosBase.get<PostResponse[]>("/v1/posts/me");
  return response.data;
};

export const uploadPost = async (
  data: PostUploadData
): Promise<ResponsePostUploadData> => {
  const response = await axiosBase.post("v1/posts", data);
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
