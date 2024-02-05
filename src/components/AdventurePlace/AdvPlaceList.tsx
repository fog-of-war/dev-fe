/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvPlaceTitle from "./AdvPlaceTitle";
import AdvPlaceImage from "./AdvPlaceImage";
import { getMyPosts } from "../../api/post";
import { PostResponse } from "../../types/types";
import NoDataComponent from "../Ranking/NoDataComponent";

const AdvPlaceList = () => {
  const [userPosts, setUserPosts] = useState<PostResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getMyPosts();
        setUserPosts(posts);
      } catch (error) {
        console.error("post data fetch error:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePlaceClick = (place_id: number | null) => {
    if (place_id) navigate(`/reviewList/${place_id}`);
  };

  // 중복 장소 제거
  const seenPlaceIds = new Set();
  const uniquePlaces = userPosts.filter((place) => {
    const duplicate = seenPlaceIds.has(place.post_place_id);
    seenPlaceIds.add(place.post_place_id);
    return !duplicate;
  });

  return (
    <>
      <AdvPlaceListLayout>
        <AdvPlaceTitle />
        {uniquePlaces.length === 0 && (
          <NoDataComponent
            text="아직 탐험된 장소가 없어요"
            image="/images/certificationModal/explorerIcon.png"
          />
        )}
        {uniquePlaces.map((place) => (
          <AdvPlaceItem
            key={place.post_id}
            onClick={() => handlePlaceClick(place.post_place_id)}
          >
            <AdvPlaceImage
              key={place.post_id}
              post_image_url={place.post_image_url}
              place_name={place.post_place.place_name}
            />
          </AdvPlaceItem>
        ))}
      </AdvPlaceListLayout>
    </>
  );
};

export default AdvPlaceList;

const AdvPlaceListLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  gap: 15px;
`;

const AdvPlaceItem = styled.div`
  width: 30%;

  &:nth-of-type(4n) {
    margin-left: 2px;
  }
`;
