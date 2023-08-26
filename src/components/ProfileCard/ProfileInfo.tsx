/** @jsxImportSource @emotion/react */
import ProfileStat from "./ProfileStat";
import { userDataState } from "../../store/userAtom";
import { useRecoilValue } from "recoil";

const ProfileInfo = () => {
  const userData = useRecoilValue(userDataState);

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
      <ProfileStat type="exploration" data={userData} />
      <ProfileStat type="badge" data={userData} />
      {/* <ProfileStat type="rank" data={userData} /> */}
    </div>
  );
};

export default ProfileInfo;
