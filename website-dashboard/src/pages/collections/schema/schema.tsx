import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/shared/loading/loading";
import { useAppSelector } from "../../../redux/store/store";
import useSchema from "./hooks/useSchema";

function Schema() {
  const { collectionName } = useParams();

  const { theme } = useAppSelector((state) => state.theme);
  const { apiKey, host, path, port, protocol } = useAppSelector(
    (state) => state.login
  );

  const { schema, loading, error } = useSchema(collectionName || "");

  return (
    <div>
      {!loading && (
        <Editor
          height="90vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(schema, null, 2)}
          loading={<Loading />}
          theme={theme === "dark" ? "vs-dark" : "light"} // light, vs-dark, hc-black
        />
      )}
    </div>
  );
}

export default Schema;
