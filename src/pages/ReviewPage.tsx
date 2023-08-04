/** @jsxImportSource @emotion/react */
import ReviewList from "../components/Review/ReviewList";
import ReviewListHeader from "../components/Review/ReviewListHeader";

const DUMMY_REVIEWS = {
  placeName: "블루보틀 성수 카페",
  reviewCount: 15,
  reviews: [
    {
      authorInfo: {
        profileImage: "./images/dummyUserImage.png",
        nickname: "여러분과함께라면행복",
      },
      rating: 4.5,
      date: "2023-08-02 오후 7:00",
      placeImage: "./images/placeImage.png",
      comment:
        "입력한 글자의 개수를 바로 확인하여 주는 도구입니다. 글자수나 단어수를 세는 것은 이력서나 자기소개서(자소서)를 작성할 때나 블로그 글을 작성할 때 입력한 글자의 개수를 바로 확인하여 주는 도구입니다. 글자수나 단어수를 세는 것은 이력서나 자기소개서",
    },
    {
      authorInfo: {
        profileImage: "./images/dummyUserImage.png",
        nickname: "동균님과함께춤을",
      },
      rating: 4.5,
      date: "2023-08-02 오후 7:00",
      placeImage: "./images/placeImage.png",
      comment: "집에 가고싶다",
    },
    {
      authorInfo: {
        profileImage: "./images/dummyUserImage.png",
        nickname: "코딩괴수윤수님",
      },
      rating: 4.5,
      date: "2023-08-02 오후 7:00",
      placeImage: "./images/placeImage.png",
      comment: "윤수님은 그저 신이다",
    },
  ],
};

const ReviewPage = () => {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 20px",
        paddingTop: "20px",
      }}
    >
      <ReviewListHeader
        placeName={DUMMY_REVIEWS.placeName}
        reviewCount={DUMMY_REVIEWS.reviewCount}
      />
      <ReviewList reviews={DUMMY_REVIEWS.reviews} />
    </div>
  );
};

export default ReviewPage;
