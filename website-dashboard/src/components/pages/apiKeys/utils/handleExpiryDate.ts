import * as epochTime from "../../../../constants/epochTime";

const handleExpiryDate = (
  event: React.FormEvent<HTMLSelectElement>,
  setEpochDate: React.Dispatch<React.SetStateAction<number>>
) => {
  switch (event.currentTarget.value) {
    case "7 days":
      setEpochDate(Date.now() + epochTime.SEVENDAYS);
      break;
    case "30 days":
      setEpochDate(Date.now() + epochTime.THIRTYDAYS);
      break;
    case "60 days":
      setEpochDate(Date.now() + epochTime.SIXTYDAYS);
      break;
    case "90 days":
      setEpochDate(Date.now() + epochTime.NINETYDAYS);
      break;
    default:
      setEpochDate(1);
      break;
  }
};

export default handleExpiryDate;
