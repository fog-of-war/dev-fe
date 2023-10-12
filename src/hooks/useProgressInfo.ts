import levelData from "../../src/data/levelData.json";

const useProgressInfo = () => {
  const calculatePoints = (currentLevel: number, currentUserPoints: number) => {
    if (currentLevel >= levelData.length - 1) {
      return 0; // 최대 레벨일 경우
    }

    const nextLevelPoints = levelData[currentLevel + 1].level_points;

    return nextLevelPoints - currentUserPoints;
  };

  const calculateProgress = (
    currentLevel: number,
    currentUserPoints: number
  ) => {
    if (currentLevel >= levelData.length - 1) {
      return 100; // 최대 레벨일 경우
    }

    const currentLevelPoints = levelData[currentLevel].level_points;
    const nextLevelPoints = levelData[currentLevel + 1].level_points;

    const pointsForCurrentLevel = currentUserPoints - currentLevelPoints;
    const pointsToReachNextLevel = nextLevelPoints - currentLevelPoints;

    return (pointsForCurrentLevel / pointsToReachNextLevel) * 100;
  };

  return { calculatePoints, calculateProgress };
};

export default useProgressInfo;
