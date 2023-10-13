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

export interface CommentAuthor {
  user_image_url: string;
  user_nickname: string;
}

export interface PostComment {
  comment_id: number;
  comment_created_at: string;
  comment_updated_at: string;
  comment_text: string;
  comment_author_id: number;
  commented_post_id: number;
  comment_is_deleted: boolean;
  comment_author: CommentAuthor;
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
  post_author: PostAuthor;
  post_comments: PostComment[];
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

export interface UserRank {
  user_id: number;
  user_points: number;
  rank: number;
}

export interface AllUserRank {
  user_id: number;
  user_nickname: string;
  user_image_url: string;
  user_points: number;
  rank: number;
  user_badges_count: number;
}

export interface UserRegionRank {
  user_id: number;
  user_nickname: string;
  user_image_url: string;
  user_selected_badge: string;
  visit_count: number;
  rank: number;
}

export interface Region {
  region_id: number;
  region_name: string;
  region_english_name: string;
  region_thumbnail_url: string;
}

export interface RegionRank {
  region: Region;
  ranking: UserRegionRank[];
  userRanking: UserRegionRank[];
}
export interface UserBadge {
  badge_id: number;
  badge_name: string;
  badge_category_id: number;
  badge_criteria: number;
  badge_points: number;
  badge_owned_users_id: number;
  badge_image_url: string;
}
export interface UserSelectedBadge {
  badge_id: number;
  badge_name: string;
  badge_category_id: number;
  badge_criteria: number;
  badge_points: number;
  badge_owned_users_id: number;
  badge_image_url: string;
}
export interface MyBadges {
  user_badges: UserBadge[];
  user_selected_badge: UserSelectedBadge;
}

export interface Badges {
  badge_id: number;
  badge_name: string;
  badge_category_id: number;
  badge_criteria: number;
  badge_points: number;
  badge_image_url: string;
}
export interface BadgeListProps {
  allBadges: Badges[];
  myBadges?: UserData["user_badges"];
  showAllBadges: boolean;
}
