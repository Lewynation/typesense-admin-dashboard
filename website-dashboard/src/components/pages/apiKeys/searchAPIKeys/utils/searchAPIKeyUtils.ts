import { Searches } from "../../../../../redux/slices/searchCheckBoxes/searchCheckBoxes";

const validate = (searches: Searches[]) => {
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
      // eslint-disable-next-line no-continue
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

export { validate, generateKeySchema, formatDate };
