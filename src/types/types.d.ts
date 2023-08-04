export interface ReviewsProps {
  placeName: string;
  reviewCount: number;
  reviews: Review[];
}

export interface Review {
  authorInfo: AuthorInfo;
  rating: number;
  date: string;
  placeImage: string;
  comment: string;
}

export interface AuthorInfo {
  profileImage: string;
  nickname: string;
}
