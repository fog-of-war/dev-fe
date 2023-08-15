/** @jsxImportSource @emotion/react */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { GetBadgePageLayout } from "../styles/styles";
import { Badge } from "../types/types";
import { badgeColors } from "../components/Badge/BadgeItem";

interface BadgeItemProps {
  badge?: Badge[];
}

const DUMMY_BADGE = [
  // 기본 칭호
  {
    id: 1,
    name: "부랑자",
    category: "기본 칭호",
    requirement: 0,
    description: "장소 0개",
    imageUrl: "images/badge/부랑자.png",
    isAcquired: true,
  },
  {
    id: 2,
    name: "시민",
    category: "기본 칭호",
    requirement: 3,
    description: "장소 3개",
    imageUrl: "images/badge/시민.png",
    isAcquired: false,
  },
  {
    id: 3,
    name: "모험가",
    category: "기본 칭호",
    requirement: 10,
    description: "장소 10개",
    imageUrl: "images/badge/모험가.png",
    isAcquired: false,
  },
  {
    id: 4,
    name: "장군",
    category: "기본 칭호",
    requirement: 50,
    description: "장소 50개",
    imageUrl: "images/badge/장군.png",
    isAcquired: false,
  },
  {
    id: 5,
    name: "성주",
    category: "기본 칭호",
    requirement: 100,
    description: "장소 100개",
    imageUrl: "images/badge/성주.png",
    isAcquired: false,
  },

  // 미식
  {
    id: 6,
    name: "냠냠이",
    category: "미식",
    requirement: 1,
    description: "맛집 1개",
    imageUrl: "images/badge/냠냠이.png",
    isAcquired: true,
  },
  {
    id: 7,
    name: "미식가",
    category: "미식",
    requirement: 5,
    description: "맛집 5개",
    imageUrl: "images/badge/미식가.png",
    isAcquired: false,
  },
  {
    id: 8,
    name: "레스토랑 사장",
    category: "미식",
    requirement: 10,
    description: "맛집 10개",
    imageUrl: "images/badge/레스토랑 사장.png",
    isAcquired: false,
  },

  // 운동
  {
    id: 9,
    name: "줄넘기",
    category: "운동",
    requirement: 1,
    description: "운동장소 1개",
    imageUrl: "images/badge/줄넘기.png",
    isAcquired: false,
  },
  {
    id: 10,
    name: "몸짱",
    category: "운동",
    requirement: 5,
    description: "운동장소 5개",
    imageUrl: "images/badge/몸짱.png",
    isAcquired: false,
  },
  {
    id: 11,
    name: "트레이너",
    category: "운동",
    requirement: 10,
    description: "운동장소 10개",
    imageUrl: "images/badge/트레이너.png",
    isAcquired: false,
  },

  // 미술관
  {
    id: 12,
    name: "화가",
    category: "미술관",
    requirement: 1,
    description: "미술관 1개",
    imageUrl: "images/badge/화가.png",
    isAcquired: false,
  },
  {
    id: 13,
    name: "다빈치",
    category: "미술관",
    requirement: 5,
    description: "미술관 5개",
    imageUrl: "images/badge/다빈치.png",
    isAcquired: false,
  },
  {
    id: 14,
    name: "피카소",
    category: "미술관",
    requirement: 10,
    description: "미술관 10개",
    imageUrl: "images/badge/피카소.png",
    isAcquired: false,
  },

  // 역사
  {
    id: 15,
    name: "석기시대",
    category: "역사",
    requirement: 1,
    description: "역사명소 1개",
    imageUrl: "images/badge/석기시대.png",
    isAcquired: false,
  },
  {
    id: 16,
    name: "한능검",
    category: "역사",
    requirement: 5,
    description: "역사명소 5개",
    imageUrl: "images/badge/한능검.png",
    isAcquired: false,
  },
  {
    id: 17,
    name: "고고학자",
    category: "역사",
    requirement: 10,
    description: "역사명소 10개",
    imageUrl: "images/badge/고고학자.png",
    isAcquired: false,
  },

  // 커피
  {
    id: 18,
    name: "아메리카노",
    category: "커피",
    requirement: 1,
    description: "카페 1개",
    imageUrl: "images/badge/아메리카노.png",
    isAcquired: false,
  },
  {
    id: 19,
    name: "라떼는말야",
    category: "커피",
    requirement: 5,
    description: "카페 5개",
    imageUrl: "images/badge/라떼는말야.png",
    isAcquired: false,
  },
  {
    id: 20,
    name: "바리스타",
    category: "커피",
    requirement: 10,
    description: "카페 10개",
    imageUrl: "images/badge/바리스타.png",
    isAcquired: false,
  },
];

const GetBadgePage = ({ badge = DUMMY_BADGE }: BadgeItemProps) => {
  const navigate = useNavigate();

  const [acquiredBadge, setAcquiredBadge] = useState<Badge | null>(null);

  const badgeColor = badgeColors[acquiredBadge?.category || "미획득"];

  useEffect(() => {
    const newlyAcquiredBadge = badge.find(
      (b) => b.isAcquired && (!acquiredBadge || b.id !== acquiredBadge.id)
    );
    if (newlyAcquiredBadge) {
      setAcquiredBadge(newlyAcquiredBadge);
    }
  }, [badge]);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <GetBadgePageLayout>
      {acquiredBadge && (
        <>
          <div></div>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "165px",
                height: "165px",
                borderRadius: "100%",
                border: `10px solid ${badgeColor.border}`,
                backgroundColor: badgeColor.background,
              }}
            >
              <img
                css={{
                  width: "85px",
                  height: "85px",
                  overflow: "hidden",
                }}
                src={acquiredBadge.imageUrl}
                alt={acquiredBadge.name}
              />
            </div>
            <span
              css={{
                fontSize: "26px",
                fontWeight: "bold",
                color: badgeColor.border,
                paddingTop: "10px",
              }}
            >
              {acquiredBadge.name} 뱃지 획득!
            </span>
            <span
              css={{
                fontSize: "20px",
                fontWeight: "400",
                color: "#6f6f6f",
                display: "block",
              }}
            >
              {acquiredBadge.description} 달성 완료
            </span>
          </div>
        </>
      )}
      <Button onClick={handleBackClick}>닫기</Button>
    </GetBadgePageLayout>
  );
};

export default GetBadgePage;
