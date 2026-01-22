import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLInputTypeAttribute } from "react";

const LabelledInput = ({
  placeHolder,
  title,
  id,
  inputType,
  ...props
}: {
  placeHolder: string;
  title: string;
  id: string;
  inputType?: HTMLInputTypeAttribute;
} & React.ComponentProps<"input">) => {
  return (
    <div className="grid gap-3 my-3">
      <Label htmlFor={id} className="font-mono">
        {title}
      </Label>
      <Input
        {...props}
        id={id}
        name={id}
        placeholder={placeHolder}
        className="font-mono"
      />
    </div>
  );
};

export default LabelledInput;
