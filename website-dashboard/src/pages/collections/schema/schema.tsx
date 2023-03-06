import Editor from "@monaco-editor/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../../components/shared/loading/loading";
import { getCollectionSchema } from "../../../redux/slices/typesenseSlice/asyncThunks";
import { RootState } from "../../../redux/store/store";
import useSchema from "./hooks/useSchema";

function Schema() {
  const dispatch = useDispatch();
  const { collectionName } = useParams();
  // const schema = useSelector(
  //   (state: RootState) => state.typesense.collectionSchema
  // );

  // useEffect(() => {
  //   dispatch(getCollectionSchema(collectionName || "")).unwrap();
  // }, [collectionName, dispatch]);

  const { schema, loading, error } = useSchema(collectionName || "");
  console.log(schema);

  const onChange = (value: any, event: any) => {
    console.log(value);
  };

  return (
    <div>
      {!loading && (
        <Editor
          height="90vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(schema, null, 2)}
          onChange={onChange}
          loading={<Loading />}
          theme="light"
        />
      )}
    </div>
  );
}

export default Schema;
