import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "./redux/store/store";
import BASEPATH from "./constants/baseURL";

function PrivateRoutes() {
  const { healthy } = useAppSelector((state) => state.typesense);
  useEffect(() => {
    console.log("PrivateRoutes");
  }, []);

  return healthy ? <Outlet /> : <Navigate to={`${BASEPATH}/login`} />;
}

export default PrivateRoutes;
