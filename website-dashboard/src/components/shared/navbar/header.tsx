import logo from "./images/logo.png";
import { ReactComponent as LogoutIcon } from "./svgs/logout.svg";

function Logo() {
  return (
    <div className="flex flex-row items-center">
      <img src={logo} alt="Logo" className="w-11 h-11 mr-3" />
      <h1 className="font-lato font-bold text-xl dark:text-gray-300">
        Typesense Dashboard
      </h1>
    </div>
  );
}
function Connection() {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col items-start mr-6">
        <p className="font-lato text-base dark:text-gray-300">Localhost</p>
        <p className="font-lato text-xs text-green-600">Connected</p>
      </div>
      <LogoutIcon className="mr-4 w-5 h-5 cursor-pointer dark:text-gray-300" />
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-row justify-between items-center h-full">
      <Logo />
      <Connection />
    </div>
  );
}

export default Header;
