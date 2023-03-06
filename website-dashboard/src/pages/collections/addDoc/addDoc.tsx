import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Actions from "../../../components/pages/collections/addDoc/actions";
import Button from "../../../components/shared/button/button";
import Loading from "../../../components/shared/loading/loading";
import { getDocumentTemplate } from "../../../redux/slices/typesenseSlice/asyncThunks";
import { RootState } from "../../../redux/store/store";
import useAddDocs from "./hooks/useAddDoc";

import { ReactComponent as AddDocument } from "./svgs/doc.svg";

function AddDoc() {
  const dispatch = useDispatch();
  const { collectionName } = useParams();
  // const schema = useSelector(
  //   (state: RootState) => state.typesense.documentTemplate
  // );
  // useEffect(() => {
  //   dispatch(getDocumentTemplate("books")).unwrap();
  // }, [dispatch]);

  const { schema, error, loading } = useAddDocs(collectionName || "");

  const onChange = (value: any, event: any) => {
    console.log(value);
  };

  return (
    <div className="overflow-y-auto">
      {!loading && (
        <>
          <Editor
            height="400px"
            defaultLanguage="json"
            defaultValue={JSON.stringify(schema, null, 2)}
            onChange={onChange}
            loading={<Loading />}
            theme="light"
          />
          <Actions />
          <div className="flex justify-between my-5 mx-8">
            <div />
            <Button onClick={() => {}} text="Add Document" Icon={AddDocument} />
          </div>
        </>
      )}
    </div>
  );
}

export default AddDoc;
