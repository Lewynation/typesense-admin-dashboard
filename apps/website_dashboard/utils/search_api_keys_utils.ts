import { Searches } from "@/redux/slices/search_check_boxes/search_check_boxes";
import * as epochTime from "@/constants/epoch_time";

const validateSearchCheckBoxes = (searches: Searches[]) => {
  const validatedList = searches.filter((search) => {
    return search.children.find(
      (child) => child.enabledBySelf === true || child.enabledByTitle === true
    );
  });
  if (validatedList.length > 0) {
    return true;
  }
  return false;
};

export type GenerateSchemaInput = {
  searchCheckBoxes: Searches[];
  APIKeyDescription: string;
  collectionList: string[];
  expiryDate: number;
  validateDescription: () => void;
  validateCollectionList: () => void;
};

const generateKeySchema = ({
  searchCheckBoxes,
  APIKeyDescription,
  collectionList,
  expiryDate,
  validateDescription,
  validateCollectionList,
}: GenerateSchemaInput) => {
  const actions: string[] = [];
  for (let i = 0; i < searchCheckBoxes.length; i += 1) {
    const element = searchCheckBoxes[i];
    if (element.selected) {
      actions.push(`${element.value.toLowerCase()}:*`);
      continue;
    }
    const children = searchCheckBoxes[i].children.filter((child) => {
      return child.enabledBySelf === true || child.enabledByTitle === true;
    });
    children.forEach((child) => {
      actions.push(`${child.value.toLowerCase()}`);
    });
  }
  if (APIKeyDescription === "") {
    validateDescription();
    return false;
  }
  if (collectionList.length === 0) {
    validateCollectionList();
    return false;
  }
  const schema = {
    description: APIKeyDescription,
    actions,
    collections: collectionList,
    expires_at: expiryDate,
  };
  return schema;
};

const formatDate = (unformatedDate: number) => {
  const formatedDate = new Date(unformatedDate);
  return formatedDate;
};
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

export {
  validateSearchCheckBoxes,
  generateKeySchema,
  formatDate,
  handleExpiryDate,
};
