/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getUserData } from "../../api/user";

import ProgressBar from "../ProgressBar";
import MainCardMap from "../Map/MainCardMap";
import FogEffect from "./FogEffect";
import MainBadgeList from "./MainBadgeList";

export interface UserData {
  user_nickname: string;
  user_image_url: string;
  user_authored_posts: [];
}

const DUMMY_BADGES = [
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
  {
    imageUrl: "/images/main/dummyBadge.png",
    badgeName: "더미뱃지",
  },
];

const MainCard = () => {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  const [userNickname, setUserNickname] = useState("");

  const [userImageUrl, setUserImageUrl] = useState("");

  const [userAuthoredPosts, setUserAuthoredPosts] = useState<string[]>([]);

  useEffect(() => {
    getUserData().then((userData: UserData) => {
      setUserNickname(userData.user_nickname);
      setUserImageUrl(userData.user_image_url);
      setUserAuthoredPosts(userData.user_authored_posts);
    });

    setIsLoaded(true);
  }, []);

  // 작은 글자 스타일
  const smallTextStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: 16,
    color: "#53AF7B",
    fontWeight: "bold",
  };

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        borderRadius: 25,
        width: "100%",
        backgroundColor: "#E4F6ED",
        padding: 20,
        overflow: "hidden",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          css={{
            width: 40,
            height: 40,
            borderRadius: "100%",
            border: "3px solid #53AF7B",
            overflow: "hidden",
            marginRight: 5,
          }}
        >
          <img
            src={userImageUrl}
            alt="프로필 사진"
            css={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          css={{
            fontSize: 22,
            color: "#53AF7B",
            fontWeight: 600,
          }}
        >
          {userNickname}
        </div>
      </div>
      <div css={{ ...smallTextStyle, whiteSpace: "nowrap", marginTop: 10 }}>
        <div css={{ marginRight: 5, marginTop: 5 }}>
          <img
            src="/images/main/flagIcon.png"
            alt="국기 아이콘"
            css={{ width: "24px", height: "24px" }}
          />
        </div>
        총탐험포인트
        <div css={{ width: "100%", marginLeft: 5, marginBottom: 18 }}>
          <ProgressBar progress={60} level={3} />
        </div>
      </div>
      <div css={{ ...smallTextStyle, marginTop: -12 }}>
        <div css={{ marginRight: 5, marginTop: 5 }}>
          <img
            src="/images/main/rankingIcon.png"
            alt="리뷰 아이콘"
            css={{ width: "24px", height: "24px" }}
          />
        </div>
        리뷰 {userAuthoredPosts.length}개
      </div>
      <div css={{ ...smallTextStyle }}>
        <div css={{ marginRight: 5, marginTop: 5 }}>
          <img
            src="/images/main/reviewIcon.png"
            alt="랭킹 아이콘"
            css={{ width: "24px", height: "24px" }}
          />
        </div>
        랭킹 5400위
      </div>
      <div
        style={{
          position: "relative",
          width: 300,
          height: 300,
          margin: "0 auto",
        }}
        onClick={() => {
          setIsLoaded(false);
          setTimeout(() => {
            navigate("/explore");
          }, 500);
        }}
      >
        <FogEffect isLoaded={isLoaded} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 300,
            height: 300,
            zIndex: 1,
          }}
        >
          <MainCardMap />
        </div>
      </div>

      <div
        css={{
          width: "100%",
          height: 30,
          backgroundColor: "#E4F6ED",
          marginTop: -25,
          zIndex: 1,
        }}
      ></div>
      <MainBadgeList badges={DUMMY_BADGES} />
    </div>
  );
};

export default MainCard;
