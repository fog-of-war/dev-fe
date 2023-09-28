/** @jsxImportSource @emotion/react */
import ProfileStat from "./ProfileStat";
import useAuthQuery from "../../hooks/useAuth";

const ProfileInfo = () => {
  const { data: userData } = useAuthQuery();

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
