import Button from "../../shared/button/button";
import { ReactComponent as PlusIcon } from "./svgs/plus.svg";

function Heading() {
  const onCLick = (): void => {
    // console.log("clicked");
  };

  return (
    <div className="flex items-center justify-between px-4 py-4">
      <p className="font-bold font-lato text-xl dark:text-gray-300">
        Collections
      </p>
      <Button text="Add Collection" onClick={onCLick} Icon={PlusIcon} />
    </div>
  );
}

export default Heading;
