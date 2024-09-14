"use client";

import React, { useState } from "react";
import { useDependencies } from "@/contexts/dependency_provider";
import {
  clearCreateCollection,
  getFieldsForDefaultSorting,
  setDefaultSortingField,
  setName,
} from "@/redux/slices/create_collection/create_collection";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { TypesenseError } from "typesense/lib/Typesense/Errors";
import { BarLoaderFullScreenWidth, Button, Icons } from "@/components/ui";
import AddFieldInputDialog from "./add_field_input_dialog";
import { useToast } from "@/hooks";
import AddedFieldsList from "./added_fields_list/added_fields_list";
import FieldTypeSelector from "./create_collection_inputs/field_type_selector";

const CreateCollectionAssembly = () => {
  const [inputFields, setInputFields] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const dependencies = useDependencies();
  const dispatch = useAppDispatch();
  const collection = useAppSelector((state) => state.createCollectionSlice);

  const fieldsForSorting = useAppSelector((state) =>
    getFieldsForDefaultSorting(state)
  );

  const createCollectionHandler = async () => {
    if (!collection.name || collection.fields.length === 0) {
      return toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "A required field `collection name` is missing",
        className: "font-oswald",
      });
    }
    setLoading(true);
    const schema: CollectionCreateSchema = {
      name: collection.name,
      default_sorting_field: collection.default_sorting_field,
      fields: collection.fields,
    };

    try {
      const collection = await dependencies?.typesense?.createCollection(
        schema
      );
      toast({
        variant: "default",
        title: "Success",
        description: `${collection?.name} created successfully`,
        className: "font-oswald",
      });
    } catch (error) {
      console.log(error);
      return toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `${(error as TypesenseError).message}`,
        className: "font-oswald",
      });
    } finally {
      setLoading(false);
      dispatch(clearCreateCollection());
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <BarLoaderFullScreenWidth loading={loading} />
      <h1 className="text-xl font-semibold font-oswald">Create collection</h1>
      <div className="mt-4">
        <p className="text-sm font-oswald">Collection name:</p>
        <input
          value={collection.name}
          type="text"
          placeholder="Enter collection name"
          className="w-full px-2 py-1 border-2 border-gray-300 rounded-lg outline-none font-oswald"
          onChange={(e) => dispatch(setName(e.target.value))}
        />
      </div>
      <FieldTypeSelector
        label={
          <p className="text-sm font-oswald">
            Default sorting field
            <span>(optional but must be int32 or float):Add a field first</span>
          </p>
        }
        valuesList={fieldsForSorting.map((field) => field.name)}
        onChange={(e) => dispatch(setDefaultSortingField(e.target.value))}
      />
      <div className="mt-6">
        {inputFields ? (
          <AddFieldInputDialog closeInputFields={() => setInputFields(false)} />
        ) : (
          <button
            className="flex items-center justify-center w-full gap-2 py-2 bg-black rounded-full"
            onClick={() => setInputFields(true)}
          >
            <Icons.Plus className="text-white" />
            <p className="text-white font-oswald">Add Field</p>
          </button>
        )}
      </div>
      <AddedFieldsList />
      {collection.fields.length > 0 && (
        <div className="flex justify-between">
          <div></div>
          <div>
            <Button className="font-oswald" onClick={createCollectionHandler}>
              Create collection
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCollectionAssembly;
