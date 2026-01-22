import * as epochTime from "@/constants/epoch_time";
import { Searches } from "@/contexts/react_context/check_box_context";
import { ExpiryDuration } from "@/zod/enums/expiry_duration";

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
};

export const getEpochTimes = (expiry: ExpiryDuration): number => {
  switch (expiry) {
    case "30days":
      return Date.now() + epochTime.THIRTYDAYS;
    case "60days":
      return Date.now() + epochTime.SIXTYDAYS;
    case "7days":
      return Date.now() + epochTime.SEVENDAYS;
    case "90days":
      return Date.now() + epochTime.NINETYDAYS;
    case "NoExpiration":
      return Date.now() + epochTime.NEVER;
    default:
      const _exhaustiveCheck: never = expiry;
      return _exhaustiveCheck;
  }
};

const generateKeySchema = ({
  searchCheckBoxes,
  APIKeyDescription,
  collectionList,
  expiryDate,
}: GenerateSchemaInput) => {
  const actions: string[] = [];
  for (let i = 0; i < searchCheckBoxes.length; i += 1) {
    const element = searchCheckBoxes[i];
    if (element.selected) {
      if (element.allowsAllOperations) {
        actions.push(`${element.value.toLowerCase()}:*`);
      } else {
        element.children.forEach((child) => {
          actions.push(`${child.value.toLowerCase()}`);
        });
      }
      continue;
    }
    const children = searchCheckBoxes[i].children.filter((child) => {
      return child.enabledBySelf === true || child.enabledByTitle === true;
    });
    children.forEach((child) => {
      actions.push(`${child.value.toLowerCase()}`);
    });
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

export { validateSearchCheckBoxes, generateKeySchema, formatDate };
