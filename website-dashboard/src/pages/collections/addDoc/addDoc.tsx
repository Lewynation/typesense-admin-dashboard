import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import Actions from "../../../components/pages/collections/addDoc/actions";
import Loading from "../../../components/shared/loading/loading";
import { getDocumentTemplate } from "../../../redux/slices/typesenseSlice/typesenseSlice";
import { RootState } from "../../../redux/store/store";

function AddDoc() {
  const dispatch = useDispatch();
  const schema = useSelector(
    (state: RootState) => state.typesense.documentTemplate
  );
  useEffect(() => {
    dispatch(getDocumentTemplate("books")).unwrap();
  }, [dispatch]);

  const onChange = (value: any, event: any) => {
    console.log(value);
  };

  return (
    <div className="overflow-y-auto">
      <Editor
        height="400px"
        defaultLanguage="json"
        defaultValue={JSON.stringify(schema, null, 2)}
        onChange={onChange}
        loading={<Loading />}
        theme="light"
      />
      <Actions />
    </div>
  );
}

export default AddDoc;
