/** @jsxImportSource @emotion/react */

import React from "react";

const RecommendLocation = () => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        color: "#53AF7B",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 20,
      }}
    >
      <img
        src="/images/main/markerIcon.png"
        alt="마커 아이콘"
        css={{ width: 16, height: 23, marginRight: 5 }}
      />
      탐험 추천
    </div>
  );
};

export default RecommendLocation;
