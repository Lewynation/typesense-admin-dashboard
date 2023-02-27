import { useEffect } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { useDispatch, useSelector } from "react-redux";
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

  return (
    <div>
      {" "}
      <JSONInput
        id="a_unique_id"
        placeholder={schema}
        // colors={darktheme}
        theme="light_mitsuketa_tribute"
        locale={locale}
        viewOnly
        confirmGood={false}
        height="400px"
        width="100%"
      />
    </div>
  );
}

export default Schema;
