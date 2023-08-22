import { createContext, useContext, useState, ReactNode } from "react";
import { PostingData } from "../pages/posting/UploadPage";

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
    place_name: string | null;
    post_star_rating: number | null;
    post_description: string | null;
    post_image_url: string | undefined;
    place_latitude: number | null;
    place_longitude: number | null;
  }>({
    place_name: null,
    post_star_rating: null,
    post_description: null,
    post_image_url: undefined,
    place_latitude: null,
    place_longitude: null,
  });

  return (
    <PostingDataContext.Provider value={{ postingData, setPostingData }}>
      {children}
    </PostingDataContext.Provider>
  );
}
