export const formatDistance = (distance: string) => {
  if (+distance < 1000) return `${distance}m`;
  return `${(+distance / 1000).toFixed(1)}km`;
};
