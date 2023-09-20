import { useEffect, useState } from "react";
import { getMyRank, getAllRank, getRegionRank } from "../api/rank";
import { UserRank, AllUserRank, RegionRank } from "../types/types";

const useRankData = () => {
  const [myRankData, setMyRankData] = useState<UserRank | null>(null);
  const [allRankData, setAllRankData] = useState<AllUserRank[] | null>(null);
  const [regionRankData, setRegionRankData] = useState<RegionRank[] | null>(
    null
  );

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

      setRegionRankData(myRegionRank);
    };

    getRegionRankData();
  }, []);

  return { myRankData, allRankData, regionRankData };
};

export default useRankData;
