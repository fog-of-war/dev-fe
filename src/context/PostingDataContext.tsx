import { createContext, useContext, useState, ReactNode } from "react";
import { PostingData } from "../types/types";

interface PostingDataContextProps {
  postingData: PostingData;
  setPostingData: React.Dispatch<React.SetStateAction<PostingData>>;
}

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
  const [postingData, setPostingData] = useState<{
    post_id: number | null;
    post_create_at: string | null;
    post_updated_at: string | null;
    post_description: string | null;
    post_image_url: string | undefined;
    post_author_id: number | null;
    post_star_rating: number | null;
    post_place_id: number | null;
    place_name: string | null;
    place_latitude: number | null;
    place_longitude: number | null;
  }>({
    post_id: null,
    post_create_at: null,
    post_updated_at: null,
    post_description: null,
    post_image_url: undefined,
    post_author_id: null,
    post_star_rating: null,
    post_place_id: null,
    place_name: null,
    place_latitude: null,
    place_longitude: null,
  });

  return (
    <PostingDataContext.Provider value={{ postingData, setPostingData }}>
      {children}
    </PostingDataContext.Provider>
  );
}
