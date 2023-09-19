import { useEffect, useState } from "react";
import { getMyRank } from "../api/rank";
import { UserRank } from "../types/types";

const useRankData = () => {
  const [myRankData, setMyRankData] = useState<UserRank | null>(null);

  useEffect(() => {
    const getRankData = async () => {
      const myRank = await getMyRank();

      setMyRankData(myRank);
    };
    getRankData();
  }, []);

  return { myRankData };
};

export default useRankData;
