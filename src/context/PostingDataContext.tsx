import { createContext, useContext, useState, ReactNode } from "react";
import {
  PlacePost,
  PlaceData,
  PostUploadData,
  PostComment,
} from "../types/types";

interface PostingDataContextProps {
  allPlaceData: PlaceData;
  setAllPlaceData: React.Dispatch<React.SetStateAction<PlaceData>>;
  postUploadData: PostUploadData;
  setPostUploadData: React.Dispatch<React.SetStateAction<PostUploadData>>;
}

const initialPostAuthor = {
  user_id: 0,
  user_nickname: "",
  user_image_url: "",
};

const initialCommentAuthor = {
  user_nickname: "",
  user_image_url: "",
};

const initialPostComment: PostComment = {
  comment_id: 0,
  comment_created_at: new Date().toISOString(),
  comment_updated_at: new Date().toISOString(),
  comment_text: "",
  comment_author_id: 0,
  commented_post_id: 0,
  comment_is_deleted: false,
  comment_author: initialCommentAuthor,
};

const initialPlacePost: PlacePost = {
  post_id: 0,
  post_created_at: new Date().toISOString(),
  post_updated_at: new Date().toISOString(),
  post_description: "",
  post_image_url: "",
  post_author_id: 0,
  post_star_rating: 0,
  post_place_id: 0,
  post_is_deleted: false,
  post_author: initialPostAuthor,
  post_comments: [initialPostComment],
};

const initialPlaceData: PlaceData = {
  place_id: 0,
  place_name: "",
  place_star_rating: null,
  place_posts: [initialPlacePost],
};

const initialPostUploadData: PostUploadData = {
  place_name: "",
  post_star_rating: 0,
  post_description: "",
  post_image_url: "",
  place_latitude: 0,
  place_longitude: 0,
};

const PostingDataContext = createContext<PostingDataContextProps | undefined>(
  undefined
);

export const usePostingContext = (): PostingDataContextProps => {
  const context = useContext(PostingDataContext);
  if (!context) {
    throw new Error("PostingDataProvider에 문제가 발생했습니다.");
  }
  return context;
};

interface PostingDataProviderProps {
  children: ReactNode;
}

export function PostingDataProvider({ children }: PostingDataProviderProps) {
  const [allPlaceData, setAllPlaceData] = useState<PlaceData>(initialPlaceData);
  const [postUploadData, setPostUploadData] = useState<PostUploadData>(
    initialPostUploadData
  );

  return (
    <PostingDataContext.Provider
      value={{
        allPlaceData,
        setAllPlaceData,
        postUploadData,
        setPostUploadData,
      }}
    >
      {children}
    </PostingDataContext.Provider>
  );
}
