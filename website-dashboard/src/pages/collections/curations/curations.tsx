import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { OverrideSchema } from "typesense/lib/Typesense/Override";
import SecondaryButton from "../../../components/shared/secondaryButton/secondaryButton";
import { openCurationsModal } from "../../../redux/slices/modalSlice/modalSlice";
import { getCurations } from "../../../redux/slices/typesenseSlice/asyncThunks";
import CurationsListTile from "../../../components/pages/curations/curationsListTile";
import CurationsListTitle from "../../../components/pages/curations/curationsListTitle";
import ListLayout from "../../../layouts/listLayout/listLayout";
import { ReactComponent as AddIcon } from "./svgs/add.svg";
import useFetchCurations from "./hooks/useFetchCurations";
import { RootState } from "../../../redux/store/store";

function Curations() {
  const dispatch = useDispatch();
  const { collectionName } = useParams();
  const onClick = () => {
    dispatch(openCurationsModal());
  };
  // useEffect(() => {
  //   dispatch(getCurations(collectionName || "")).unwrap();
  // }, [dispatch, collectionName]);
  const { curations, loading, error } = useFetchCurations(collectionName || "");

  // const { overrides } = useSelector(
  //   (state: RootState) => state.typesense.curations
  // );
  // console.log(overrides);
  return (
    <>
      <div className="">
        <SecondaryButton
          Icon={AddIcon}
          text="Add a Curation"
          onClick={onClick}
        />
      </div>
      <ListLayout>
        <CurationsListTitle />
        {curations.map((override) => {
          return (
            <CurationsListTile
              key={override.id}
              curationQuery={override.rule.query}
              curationMatchType={override.rule.match}
              curationIncudes={override.includes?.length || 0}
              curationExcludes={override.excludes?.length || 0}
            />
          );
        })}
      </ListLayout>
    </>
  );
}

export default Curations;
