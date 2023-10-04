import { useState, useEffect } from "react";
import { getAllBadges } from "../api/badge";
import { Badges } from "../types/types";

const useBadgeData = () => {
  const [allBadges, setAllBadges] = useState<Badges[]>([]);

  useEffect(() => {
    const getAllBadgeData = async () => {
      const badges = await getAllBadges();
      setAllBadges(badges);
    };
    getAllBadgeData();
  }, []);

  return { allBadges };
};

export default useBadgeData;
