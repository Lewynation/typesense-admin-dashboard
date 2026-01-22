export const formatEpochDate = (epochDate: number): string => {
  const formattedDate = new Date(epochDate * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formattedDate;
};
