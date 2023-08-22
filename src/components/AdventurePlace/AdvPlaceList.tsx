/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import AdvPlaceTitle from "./AdvPlaceTitle";
import AdvPlaceImage from "./AdvPlaceImage";
import { getMyPosts } from "../../api/post";
import { PostingData } from "../../pages/posting/UploadPage";

const AdvPlaceList = () => {
  const [userPosts, setUserPosts] = useState<PostingData[]>([]);

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
        {userPosts.map((place, index) => (
          <AdvPlaceImage
            key={index}
            post_image_url={place.post_image_url}
            place_name={place.place_name}
          />
        ))}
      </div>
    </>
  );
};

export default AdvPlaceList;
