/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "../components/Review/ReviewList";
import PageHeader from "../components/UI/PageHeader";
import { getAllPostsByPlaceId } from "../api/post";
import { PlaceData } from "../types/types";

const ReviewPage = () => {
  const [placeData, setPlaceData] = useState<PlaceData>();
  const { placeId } = useParams<{ placeId: string }>();

  const numberPlaceId = Number(placeId);

  useEffect(() => {
    const fetchPosts = async () => {
      const postList = await getAllPostsByPlaceId(numberPlaceId);
      setPlaceData(postList);
    };
    fetchPosts();
  }, [numberPlaceId]);

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
      {placeData && (
        <>
          <PageHeader
            headerTitle={placeData.place_name}
            pageInfo={placeData.place_posts.length}
          />
          <ReviewList
            reviews={placeData.place_posts}
            placeId={placeData.place_id}
          />
        </>
      )}
    </div>
  );
};

export default ReviewPage;
