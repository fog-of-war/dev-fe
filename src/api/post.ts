import { PostingData } from "../pages/posting/UploadPage";
import { axiosBase } from "./axios";

export const uploadPost = async (data: PostingData) => {
  axiosBase.post("v1/posts", data);
};
