import { MoonLoader } from "react-spinners";

export const CircularSpinner = ({ size = 30 }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center">
      <MoonLoader size={size} color={"blue"} />
    </div>
  );
};
