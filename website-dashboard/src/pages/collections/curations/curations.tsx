import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { OverrideRuleQuerySchema } from "typesense/lib/Typesense/Overrides";
import SecondaryButton from "../../../components/shared/secondaryButton/secondaryButton";
import { openCurationsModal } from "../../../redux/slices/modalSlice/modalSlice";
import CurationsListTile from "../../../components/pages/curations/curationsListTile";
import CurationsListTitle from "../../../components/pages/curations/curationsListTitle";
import ListLayout from "../../../layouts/listLayout/listLayout";
import { ReactComponent as AddIcon } from "./svgs/add.svg";
import useFetchCurations from "./hooks/useFetchCurations";

function Curations() {
  const dispatch = useDispatch();
  const { collectionName } = useParams();
  const onClick = () => {
    dispatch(openCurationsModal());
  };
  const { curations, loading, error } = useFetchCurations(collectionName || "");

  const getQuery = (
    query: OverrideRuleQuerySchema,
    requestParam: "query" | "match"
  ) => {
    interface OverrideSchemaRefresh extends OverrideRuleQuerySchema {
      query: string;
      match: "exact" | "contains";
    }
    const override = query as OverrideSchemaRefresh;

    switch (requestParam) {
      case "query":
        return override.query;
      case "match":
        return override.match;
      default:
        return "";
    }
  };

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
              curationQuery={getQuery(
                override.rule as OverrideRuleQuerySchema,
                "query"
              )}
              // curationMatchType={override.rule.match}
              curationMatchType={getQuery(
                override.rule as OverrideRuleQuerySchema,
                "match"
              )}
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
