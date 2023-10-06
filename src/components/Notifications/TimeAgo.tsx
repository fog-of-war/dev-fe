import React from "react";
import colors from "../../constants/colors";
import B3 from "../UI/B3";

interface TimeAgoProps {
  timestamp: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  const calculateTimeAgo = (timestamp: string) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);

    const timeDifferenceInSeconds = Math.floor(
      (currentTime.getTime() - postTime.getTime()) / 1000
    );

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds}초 전`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours}시간 전`;
    } else if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days}일 전`;
    } else {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return `${months}개월 전`;
    }
  };

  return (
    <B3 style={{ color: colors.lightGrey, fontWeight: 400 }}>
      {calculateTimeAgo(timestamp)}
    </B3>
  );
};

export default TimeAgo;
