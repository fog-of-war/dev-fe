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

export interface UpdatedReview {
  post_star_rating: number;
  post_description: string;
}

export interface AuthorInfo {
  _id: string;
  profileImage: string;
  nickname: string;
}

export interface MapTag {
  id: number;
  name: string;
  icon: string;
}

export interface RecentSearch {
  id: number;
  searchQuery: string;
  type: "keyword" | "place";
  place?: Place;
}

export interface Badge {
  id: number;
  name: string;
  category: string;
  requirement: number;
  description: string;
  imageUrl: string;
  isAcquired: boolean;
}

export interface BadgeListProps {
  badges: Badge[];
  showAllBadges: boolean;
}

export interface PlacePost {
  post_id: number;
  post_created_at: string;
  post_updated_at: string;
  post_description: string;
  post_image_url: string;
  post_author_id: number;
  post_star_rating: number;
  post_place_id: number;
  post_is_deleted: boolean;
}

export interface PlaceCategory {
  placeId: number;
  categoryId: number;
  category: {
    category_id: number;
    category_name: string;
    category_points: number;
    category_created_at: string;
    category_updated_at: string;
  };
}

export interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  naver_place_url: string;
  road_address_name: string;
  x: string;
  y: string;
  place_posts: PlacePost[];
  place_star_rating: number | null;
  place_category_map: PlaceCategoryMap[];
}

export interface UserData {
  user_id: number;
  user_image_url: string;
  user_nickname: string;
  user_points: number;
  user_level: number;
  user_is_admin: string;
  user_is_deleted: boolean;
  user_badges: UserBadge[];
  user_visited_places: string[];
  user_authored_posts: string[];
}

export interface PostAuthor {
  user_id: number;
  user_nickname: string;
  user_image_url: string;
}

export interface PlacePost {
  post_id: number;
  post_created_at: string;
  post_updated_at: string;
  post_description: string;
  post_image_url: string;
  post_author_id: number;
  post_star_rating: number;
  post_author: PostAuthor;
}

export interface MyPosts {
  post_id: number;
  post_image_url: string;
  place_name: string;
  post_place_id: number;
}

export interface PlaceData {
  place_id: number;
  place_name: string;
  place_star_rating: number;
  place_posts: PlacePost[];
}

export interface PostUploadData {
  place_name: string;
  post_star_rating: number;
  post_description: string;
  post_image_url: string;
  place_latitude: number;
  place_longitude: number;
}

export interface ProfileSetupData {
  user_nickname: string;
  user_image_url: string;
}

export interface UserRank {
  user_id: number;
  user_points: number;
  rank: number;
}
