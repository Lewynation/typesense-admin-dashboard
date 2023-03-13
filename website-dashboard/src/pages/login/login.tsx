import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import DEFAULTCREDS from "../../constants/defaultCreds";
import STORAGEKEY from "../../constants/localStorage";
import { setAPILoginCredentials } from "../../redux/slices/loginSlice/loginSlice";
import { confirmHealth } from "../../redux/slices/typesenseSlice/asyncThunks";
import { useAppDispatch } from "../../redux/store/store";
import logo from "./images/logo.png";
import LoginInput from "./loginInput";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [apiKey, setApiKey] = useState(DEFAULTCREDS.apiKey);
  const [host, setHost] = useState(DEFAULTCREDS.host);
  const [path, setPath] = useState(DEFAULTCREDS.path);
  const [port, setPort] = useState(DEFAULTCREDS.port);
  const [protocol, setProtocol] = useState(DEFAULTCREDS.protocol);
  const [isNotNumber, setIsNotNumber] = useState(false);
  const [credentials, setCredentials] = useLocalStorage(STORAGEKEY, "");

  const login = async () => {
    if (apiKey.length === 0) return;
    if (host.length === 0) return;
    const creds = {
      apiKey,
      host,
      path,
      port,
      protocol,
    };
    setCredentials(JSON.stringify(creds));
    dispatch(setAPILoginCredentials(creds));
    await dispatch(confirmHealth(creds)).unwrap();
    navigate("/");
  };

  return (
    <div className="flex p-3 bg-[url('https://images.unsplash.com/photo-1482160549825-59d1b23cb208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80')] w-screen h-screen">
      <div className="w-1/3 p-6 rounded-md bg-[#0d1117] flex flex-col gap-3 items-center justify-between">
        <div />
        <div className="flex flex-row items-center">
          <img src={logo} alt="Logo" className="w-16 h-16 mr-3" />
          <h1 className="font-lato font-bold text-3xl text-gray-300">
            Typesense Dashboard
          </h1>
        </div>
        <div className="w-full">
          <LoginInput
            placeholder="API key"
            textElement="requires server with cors enabled."
            onChange={(e) => {
              setApiKey(e.target.value);
            }}
          />
          <div className="w-full py-1">
            <select
              name="expiry"
              id="expiry"
              className="outline-none rounded-sm border-b-[1px] px-2 py-2 w-full mb-3 font-lato text-gray-200 bg-transparent border-gray-600"
              onChange={(e) => {
                setProtocol(e.target.value);
              }}
            >
              <option value="Http">http</option>
              <option value="Https">https</option>
            </select>
          </div>
          <LoginInput
            placeholder="Host (e.g. localhost)"
            onChange={(e) => {
              setHost(e.target.value);
            }}
          />
          <LoginInput
            placeholder="Port number (e.g. 8108)"
            errorText={isNotNumber ? "Please enter a valid port number" : ""}
            onChange={(e) => {
              if (Number.isNaN(Number(e.target.value))) {
                setIsNotNumber(true);
                return;
              }
              setIsNotNumber(false);
              setPort(Number(e.target.value));
            }}
          />
          <LoginInput
            placeholder="Path (e.g. /typesense)"
            textElement="optional: leave blank or start with / and end without /"
            onChange={(e) => {
              setPath(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <button
              type="button"
              className="outline-none cursor-pointer bg-[#37184e] font-bold py-2 px-8 text-lg mt-4 rounded-md font-lato text-gray-300"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
        <div />
        <div>
          <p className="font-bold font-lato text-gray-200">Ocluse</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
