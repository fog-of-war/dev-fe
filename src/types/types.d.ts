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
  _id: string;
  profileImage: string;
  nickname: string;
}

export interface MapTag {
  id: number;
  name: string;
  icon: string;
}

export interface Search {
  id: number;
  search: string;
  type: string;
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
  road_address_name: string;
  x: string;
  y: string;
}

export interface UserData {
  user_image_url: string;
  user_nickname: string;
  user_point: number;
  user_level: number;
  user_is_admin: string;
  user_is_deleted: boolean;
  user_badges: UserBadge[];
  user_visited_places: string[];
  user_authored_posts: string[];
}

export interface ProfileSetupData {
  user_nickname: string;
  user_image_url: string;
}
