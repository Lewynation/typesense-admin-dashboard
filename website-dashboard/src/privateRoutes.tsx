import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./redux/store/store";

function PrivateRoutes() {
  const { healthy } = useAppSelector((state) => state.typesense);

  return healthy ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
