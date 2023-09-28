import { useEffect, useState } from "react";
import useAuthQuery from "./useAuthQuery";
import { getMyRank, getAllRank, getRegionRank } from "../api/rank";
import { UserRank, AllUserRank, RegionRank } from "../types/types";

const useRankData = () => {
  const [myRankData, setMyRankData] = useState<UserRank | null>(null);
  const [allRankData, setAllRankData] = useState<AllUserRank[] | null>(null);
  const [regionRankData, setRegionRankData] = useState<RegionRank[] | null>(
    null
  );
  const currentUserId = useAuthQuery().data?.user_id;

  useEffect(() => {
    const getRankData = async () => {
      const myRank = await getMyRank();

      setMyRankData(myRank);
    };
    getRankData();
  }, []);

  useEffect(() => {
    const getAllRankData = async () => {
      const allUserRankData = await getAllRank();

      setAllRankData(allUserRankData);
    };

    getAllRankData();
  }, []);

  useEffect(() => {
    const getRegionRankData = async () => {
      const myRegionRank = await getRegionRank();

      const currentUserRegionRanks = myRegionRank
        .map((region) => ({
          ...region,
          userRanking: region.ranking.filter(
            (userRank) => userRank.user_id === currentUserId
          ),
        }))
        .filter((region) => region.userRanking[0]);

      const sortedRegionRankData = currentUserRegionRanks.sort(
        (a, b) =>
          (a.userRanking[0]?.rank || Infinity) -
          (b.userRanking[0]?.rank || Infinity)
      );

      setRegionRankData(sortedRegionRankData);
    };

    getRegionRankData();
  }, []);

  return { myRankData, allRankData, regionRankData };
};

export default useRankData;
