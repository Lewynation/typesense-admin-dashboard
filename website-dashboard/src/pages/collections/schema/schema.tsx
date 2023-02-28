import Editor from "@monaco-editor/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/shared/loading/loading";
import { getCollectionSchema } from "../../../redux/slices/typesenseSlice/typesenseSlice";
import { RootState } from "../../../redux/store/store";

function Schema() {
  const dispatch = useDispatch();
  const schema = useSelector(
    (state: RootState) => state.typesense.collectionSchema
  );

  useEffect(() => {
    dispatch(getCollectionSchema("books")).unwrap();
  }, [dispatch]);

  const onChange = (value: any, event: any) => {
    console.log(value);
  };

  return (
    <div>
      {" "}
      <Editor
        height="90vh"
        defaultLanguage="json"
        defaultValue={JSON.stringify(schema, null, 2)}
        onChange={onChange}
        loading={<Loading />}
        theme="light"
      />
    </div>
  );
}

export default Schema;
