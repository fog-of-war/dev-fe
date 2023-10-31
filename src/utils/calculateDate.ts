export const timeSince = (date: string) => {
  const secondsPast = (Date.now() - new Date(date).getTime()) / 1000;

  if (secondsPast < 60) {
    return `${Math.round(secondsPast)}초전`;
  }
  if (secondsPast < 3600) {
    return `${Math.round(secondsPast / 60)}분전`;
  }
  if (secondsPast <= 86400) {
    return `${Math.round(secondsPast / 3600)}시간전`;
  }
  if (secondsPast <= 2592000) {
    return `${Math.round(secondsPast / 86400)}일전`;
  }
  return date;
};

export const formatDateToKoreanFormat = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const amPm = hours < 12 ? "오전" : "오후";

  // 12시간 형식으로 변환
  const formattedHours = hours > 12 ? hours - 12 : hours;
  const formattedHoursString = String(formattedHours).padStart(2, "0");

  return `${year}-${month}-${day} ${amPm} ${formattedHoursString}:${minutes}`;
};
