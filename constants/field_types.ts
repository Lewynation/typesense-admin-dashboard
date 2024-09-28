import {
  FieldTypes,
  LocaleTypes,
} from "@/redux/slices/create_collection/create_collection_types";

export const fieldTypes: FieldTypes[] = [
  "string",
  "string[]",
  "int32",
  "int32[]",
  "int64",
  "int64[]",
  "float",
  "float[]",
  "bool",
  "bool[]",
  "geopoint",
  "geopoint[]",
  "object",
  "object[]",
  "string*",
  "auto",
];

export const locale: Record<string, LocaleTypes> = {
  default: "default",
  "ja - Japanese": "ja",
  "zh - Chinese": "zh",
  "ko - Korean": "ko",
  "th - Thai": "th",
  "el - Greek": "el",
  "ru - Russian": "ru",
  "sr - Serbian": "sr",
  "uk - Ukrainian": "uk",
  "be - Belarusian": "be",
};
