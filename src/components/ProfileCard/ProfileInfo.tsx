/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import ProfileStat from "./ProfileStat";
import useAuthQuery from "../../hooks/useAuth";
import useRankData from "../../hooks/useRankData";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const { data: userData } = useAuthQuery();
  const { myRankData } = useRankData();
  const navigate = useNavigate();

  const goToRankPage = () => navigate("/ranking");

  const goToBadgePage = () => navigate("/badgeList");

  const goToExplorationPage = () => navigate("/profile");

  return (
    <ProfileInfoLayout>
      <ProfileStat
        type="exploration"
        data={userData}
        rankData={myRankData}
        onClick={goToExplorationPage}
      />
      <ProfileStat
        type="badge"
        data={userData}
        rankData={myRankData}
        onClick={goToBadgePage}
      />
      <ProfileStat
        type="rank"
        data={userData}
        rankData={myRankData}
        onClick={goToRankPage}
      />
    </ProfileInfoLayout>
  );
};

export default ProfileInfo;

const ProfileInfoLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 20px;
  background-color: white;
`;
