import { createContext, useContext, useState, ReactNode } from "react";
import { UpdatedReview } from "../types/types";

interface ReviewContextProps {
  updateReview: UpdatedReview;
  setUpdateReview: React.Dispatch<React.SetStateAction<UpdatedReview>>;
}

const defaultReview: UpdatedReview = {
  post_star_rating: 0,
  post_description: "",
};

const ReviewContext = createContext<ReviewContextProps | null>(null);

export const useReviewContext = (): ReviewContextProps => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("ReviewContextProvider에 문제가 발생했습니다.");
  }
  return context;
};

interface ReviewContextProviderProps {
  children: ReactNode;
  initialReview?: UpdatedReview;
}

export const ReviewContextProvider = ({
  children,
}: ReviewContextProviderProps) => {
  const [updateReview, setUpdateReview] =
    useState<UpdatedReview>(defaultReview);

  return (
    <ReviewContext.Provider
      value={{
        updateReview,
        setUpdateReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
