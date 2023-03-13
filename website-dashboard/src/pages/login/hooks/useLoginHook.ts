import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { confirmHealth } from "../../../redux/slices/typesenseSlice/asyncThunks";
import { useAppDispatch } from "../../../redux/store/store";

const validateCredentials = async (
  credits: string,
  dispatch: ThunkDispatch<any, any, any>
) => {
  const creds = JSON.parse(credits);
  if (!creds) return false;
  console.log("creds", creds);
  // await dispatch(confirmHealth()).unwrap();
  return true;
  /// Try the health endpoint
};

const useLogin = () => {
  const [credentials, setCredentials] = useLocalStorage("apikeky", "");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log("location", location.pathname);

  useEffect(() => {
    validateCredentials(credentials, dispatch)
      .then((response) => {
        if (response) {
          console.log("response", response);
          // navigate(location.pathname); // Navigate to teh currnet path contents
        }
      })
      .catch((err) => {})
      .finally(() => {});
  }, [credentials, navigate, dispatch, location.pathname]);

  return setCredentials;
};

export default useLogin;
