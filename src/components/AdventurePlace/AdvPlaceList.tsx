/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvPlaceTitle from "./AdvPlaceTitle";
import AdvPlaceImage from "./AdvPlaceImage";
import { getMyPosts } from "../../api/post";
import { PostingData } from "../../types/types";

const AdvPlaceList = () => {
  const [userPosts, setUserPosts] = useState<PostingData[]>([]);
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

  return (
    <>
      <div
        css={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "350px",
          gap: 8,
        }}
      >
        <AdvPlaceTitle />
        {userPosts.map((place, id) => (
          <div key={id} onClick={() => handlePlaceClick(place.post_place_id)}>
            <AdvPlaceImage
              key={id}
              post_image_url={place.post_image_url}
              place_name={place.place_name}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AdvPlaceList;
