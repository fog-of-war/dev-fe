/** @jsxImportSource @emotion/react */

import ProfileStat from "./ProfileStat";
import useAuthQuery from "../../hooks/useAuthQuery";
import useRankData from "../../hooks/useRankData";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const { data: userData } = useAuthQuery();
  const { myRankData } = useRankData();
  const navigate = useNavigate();

  const goToRankPage = () => navigate("/ranking");

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "350px",
        height: "20px",
        backgroundColor: "white",
      }}
    >
      <ProfileStat type="exploration" data={userData} rankData={myRankData} />
      <ProfileStat type="badge" data={userData} rankData={myRankData} />
      <ProfileStat
        type="rank"
        data={userData}
        rankData={myRankData}
        onClick={goToRankPage}
      />
    </div>
  );
};

export default ProfileInfo;
