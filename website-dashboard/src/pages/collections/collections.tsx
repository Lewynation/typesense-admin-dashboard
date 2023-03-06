import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import CollectionList from "../../components/pages/collections/collectionList";
import Heading from "../../components/pages/collections/header";
import { getCollections } from "../../redux/slices/typesenseSlice/asyncThunks";

export function CollectionIndex() {
  return (
    <div>
      <Heading />
      <CollectionList />
    </div>
  );
}

function Collections() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}

export default Collections;
