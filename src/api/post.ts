import { PostingData } from "../pages/posting/UploadPage";
import { axiosBase } from "./axios";

export const getMyPosts = async (): Promise<PostingData[]> => {
  const response = await axiosBase.get<PostingData[]>("/v1/posts/me");
  return response.data;
};

export const uploadPost = async (data: PostingData): Promise<PostingData> => {
  const response = await axiosBase.post<PostingData>("v1/posts", data);
  const newPosting = response.data;

  return newPosting;
};

// export const updatePost = async (post: PostingData): Promise<PostingData> => {

//   const data = {
//   post_star_rating: post.post_star_rating,
//   post_description: post.post_description,
//   }

//   const response = await axiosBase.patch<PostingData>(`/v1/posts/${post.id}`, data);
//   const updatedPost = response.data;

//   return updatedPost;
// };

export const deleteTodo = async (id: number): Promise<void> => {
  await axiosBase.delete(`/v1/posts/${id}`);
};
