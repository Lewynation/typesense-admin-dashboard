import {
  CreateCollection,
  CreateCollectionField,
} from "@/zod/create_collection";

interface FieldPatchOperation {
  name: string;
  drop?: true;
  type?: string;
  optional?: boolean;
  facet?: boolean;
  index?: boolean;
  sort?: boolean;
  locale?: string;
  infix?: boolean;
  stem?: boolean;
  num_dim?: number;
  store?: boolean;
  range_index?: boolean;
  embed?: {
    from: string[];
    model_config: unknown;
  };
}

interface SchemaDiffResult {
  hasChanges: boolean;
  fields: FieldPatchOperation[];
  deletedFields: string[];
  modifiedFields: string[];
  addedFields: string[];
  topLevelChanges: {
    defaultSortField?: boolean;
    symbolsToIndex?: boolean;
    tokenSeparators?: boolean;
    metadata?: boolean;
    enableNestedFields?: boolean;
  };
}

export const detectSchemaChanges = (
  originalSchema: CreateCollection,
  updatedSchema: CreateCollection,
): SchemaDiffResult => {
  const result: SchemaDiffResult = {
    hasChanges: false,
    fields: [],
    deletedFields: [],
    modifiedFields: [],
    addedFields: [],
    topLevelChanges: {},
  };

  const topLevelChanges = detectTopLevelChanges(originalSchema, updatedSchema);
  result.topLevelChanges = topLevelChanges;
  if (Object.keys(topLevelChanges).length > 0) {
    result.hasChanges = true;
  }

  const originalFieldsMap = new Map(
    originalSchema.fields.map((f) => [f.name, f]),
  );
  const updatedFieldsMap = new Map(
    updatedSchema.fields.map((f) => [f.name, f]),
  );

  // Check for deleted fields
  for (const [fieldName, _] of originalFieldsMap) {
    if (!updatedFieldsMap.has(fieldName)) {
      result.hasChanges = true;
      result.deletedFields.push(fieldName);
      result.fields.push({
        name: fieldName,
        drop: true,
      });
    }
  }

  // Check for added and modified fields
  for (const [fieldName, updatedField] of updatedFieldsMap) {
    const originalField = originalFieldsMap.get(fieldName);

    if (!originalField) {
      // New field added
      result.hasChanges = true;
      result.addedFields.push(fieldName);
      result.fields.push(convertFieldToApiFormat(updatedField));
    } else {
      // Check if field has been modified
      if (hasFieldChanged(originalField, updatedField)) {
        result.hasChanges = true;
        result.modifiedFields.push(fieldName);

        // Drop then add pattern for modifications
        result.fields.push({
          name: fieldName,
          drop: true,
        });
        result.fields.push(convertFieldToApiFormat(updatedField));
      } else if (isEmbeddingApiKeyUpdate(originalField, updatedField)) {
        // Special case: Only API key update for embedding
        result.hasChanges = true;
        result.modifiedFields.push(fieldName);
        result.fields.push(convertFieldToApiFormat(updatedField));
      }
    }
  }

  return result;
};

const detectTopLevelChanges = (
  original: CreateCollection,
  updated: CreateCollection,
): SchemaDiffResult["topLevelChanges"] => {
  const changes: SchemaDiffResult["topLevelChanges"] = {};
  if (original.defaultSortField !== updated.defaultSortField) {
    changes.defaultSortField = true;
  }
  if (!areArraysEqual(original.symbolsToIndex, updated.symbolsToIndex)) {
    changes.symbolsToIndex = true;
  }
  if (!areArraysEqual(original.tokenSeparators, updated.tokenSeparators)) {
    changes.tokenSeparators = true;
  }
  if (JSON.stringify(original.metadata) !== JSON.stringify(updated.metadata)) {
    changes.metadata = true;
  }
  if (original.enableNestedFields !== updated.enableNestedFields) {
    changes.enableNestedFields = true;
  }
  return changes;
};

const areArraysEqual = (
  arr1: string[] | undefined,
  arr2: string[] | undefined,
): boolean => {
  if (!arr1 && !arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, idx) => val === arr2[idx]);
};

const hasFieldChanged = (
  original: CreateCollectionField,
  updated: CreateCollectionField,
): boolean => {
  // Compare basic properties
  if (
    original.fieldType !== updated.fieldType ||
    original.optional !== updated.optional ||
    original.facet !== updated.facet ||
    original.index !== updated.index ||
    original.sort !== updated.sort ||
    original.infix !== updated.infix ||
    original.stem !== updated.stem ||
    original.rangeIndex !== updated.rangeIndex ||
    original.store !== updated.store ||
    original.locale !== updated.locale ||
    original.numberOfDimensions !== updated.numberOfDimensions ||
    original.vectorDistance !== updated.vectorDistance ||
    original.reference !== updated.reference
  ) {
    return true;
  }

  // Compare auto embedding field
  const origEmbed = original.autoEmbeddingField;
  const updEmbed = updated.autoEmbeddingField;

  // If one has embedding and the other doesn't
  if (!!origEmbed !== !!updEmbed) {
    return true;
  }

  // If both have embedding, compare deeply
  if (origEmbed && updEmbed) {
    const origProvider = origEmbed.provider;
    const updProvider = updEmbed.provider;

    // Compare provider type
    if (origProvider?.type !== updProvider?.type) {
      return true;
    }

    // Compare embedFrom arrays
    const origFrom = origEmbed.embedFrom || [];
    const updFrom = updEmbed.embedFrom || [];

    if (origFrom.length !== updFrom.length) {
      return true;
    }

    if (!origFrom.every((val, idx) => val === updFrom[idx])) {
      return true;
    }

    // Compare model_config (excluding api_key for this check)
    if (
      origProvider &&
      updProvider &&
      origProvider.type !== "_No Embedding_" &&
      updProvider.type !== "_No Embedding_"
    ) {
      const {
        api_key: origApiKey,
        access_token: origAccessToken,
        ...origConfig
      } = origProvider as any;
      const {
        api_key: updApiKey,
        access_token: updAccessToken,
        ...updConfig
      } = updProvider as any;

      // Compare all config except sensitive keys
      if (JSON.stringify(origConfig) !== JSON.stringify(updConfig)) {
        return true;
      }
    }
  }

  return false;
};

const isEmbeddingApiKeyUpdate = (
  original: CreateCollectionField,
  updated: CreateCollectionField,
): boolean => {
  const origEmbed = original.autoEmbeddingField;
  const updEmbed = updated.autoEmbeddingField;

  // Must both have embedding
  if (!origEmbed || !updEmbed) {
    return false;
  }

  const origProvider = origEmbed.provider;
  const updProvider = updEmbed.provider;

  // Must have providers and same type
  if (!origProvider || !updProvider || origProvider.type !== updProvider.type) {
    return false;
  }

  if (origProvider.type === "_No Embedding_") {
    return false;
  }

  // Check if only API key/access token changed
  const origProviderAny = origProvider as any;
  const updProviderAny = updProvider as any;

  const apiKeyChanged = origProviderAny.api_key !== updProviderAny.api_key;
  const accessTokenChanged =
    origProviderAny.access_token !== updProviderAny.access_token;

  return apiKeyChanged || accessTokenChanged;
};

export const convertFieldToApiFormat = (
  field: CreateCollectionField,
): FieldPatchOperation => {
  const provider = field.autoEmbeddingField?.provider;
  let modelConfig: unknown | undefined = undefined;

  if (provider) {
    const { type, ...other } = provider;
    modelConfig = other;
  }

  const embedFrom = field.autoEmbeddingField?.embedFrom;
  const embedFieldPresent = !!embedFrom && !!modelConfig;

  const result: FieldPatchOperation = {
    name: field.name,
    type: field.fieldType,
  };

  if (!embedFieldPresent) {
    // Only include these properties if no embedding
    if (field.facet !== undefined) result.facet = field.facet;
    if (field.index !== undefined) result.index = field.index;
    if (field.infix !== undefined) result.infix = field.infix;
    if (field.optional !== undefined) result.optional = field.optional;
    if (field.sort !== undefined) result.sort = field.sort;
    if (field.stem !== undefined) result.stem = field.stem;
    if (field.store !== undefined) result.store = field.store;
  }

  if (field.locale !== undefined) result.locale = field.locale;
  if (field.numberOfDimensions !== undefined)
    result.num_dim = field.numberOfDimensions;
  if (field.rangeIndex !== undefined) result.range_index = field.rangeIndex;

  if (embedFieldPresent) {
    result.embed = {
      from: embedFrom!,
      model_config: modelConfig,
    };
  }

  return result;
};

export const generatePatchRequestBody = (
  diffResult: SchemaDiffResult,
  newSchemaData: CreateCollection,
): {
  enable_nested_fields?: boolean | undefined;
  metadata?: unknown;
  token_separators?: string[] | undefined;
  symbols_to_index?: string[] | undefined;
  default_sorting_field?: string | undefined;
  fields?: FieldPatchOperation[] | undefined;
} | null => {
  if (!diffResult.hasChanges) {
    return null;
  }

  return {
    ...(diffResult.fields.length && { fields: diffResult.fields }),
    ...(diffResult.topLevelChanges.defaultSortField && {
      default_sorting_field: newSchemaData.defaultSortField,
    }),
    ...(diffResult.topLevelChanges.symbolsToIndex && {
      symbols_to_index: newSchemaData.symbolsToIndex,
    }),
    ...(diffResult.topLevelChanges.tokenSeparators && {
      token_separators: newSchemaData.tokenSeparators,
    }),
    ...(diffResult.topLevelChanges.metadata && {
      metadata: newSchemaData.metadata,
    }),
    ...(diffResult.topLevelChanges.enableNestedFields && {
      enable_nested_fields: newSchemaData.enableNestedFields,
    }),
  };
};
