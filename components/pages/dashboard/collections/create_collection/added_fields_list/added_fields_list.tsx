"use client";

import { deteteSingleField } from "@/redux/slices/create_collection/create_collection";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import React from "react";
import { Icons } from "@/components/ui";

const AddedFieldsList = () => {
  const dispatch = useAppDispatch();
  const collection = useAppSelector((state) => state.createCollectionSlice);

  const deleteFieldHandler = (id: string) => {
    dispatch(deteteSingleField(id));
  };

  return (
    <div className="my-5">
      {collection.fields.length > 0 && (
        <p className="text-sm font-oswald">Fields:</p>
      )}
      {collection.fields.map((field, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between w-full px-3 py-3 my-4 bg-gray-200 rounded-2xl"
          >
            <div>
              <div className="flex gap-2">
                <p className="font-bold font-oswald">Name:</p>
                <p className="font-oswald">{field.name}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold font-oswald">Type:</p>
                <p className="font-oswald">{field.type}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold font-oswald">Locale:</p>
                <p className="font-oswald">
                  {field.locale === "" ? "default" : field.locale}
                </p>
              </div>
              <div className="flex gap-2">
                <div>
                  {field.optional && <p className="font-oswald">Optional</p>}
                </div>
                <div>{field.facet && <p className="font-oswald">Facet</p>}</div>
                <div>{field.sort && <p className="font-oswald">Sort</p>}</div>
                <div>{field.index && <p className="font-oswald">Index</p>}</div>
              </div>
            </div>
            <div>
              <button
                className="outline-none"
                onClick={() => deleteFieldHandler(field.id)}
              >
                <Icons.Trash size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddedFieldsList;
