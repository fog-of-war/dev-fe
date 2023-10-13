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
