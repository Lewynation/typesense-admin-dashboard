"use client";

import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "./label";

export default function MultiValueInput({
  onValueChange,
  label,
  initialValue,
  disabled,
}: {
  label?: string;
  onValueChange: (values: string[]) => void;
  initialValue?: string[];
  disabled?: boolean;
}) {
  useEffect(() => {
    if (initialValue) {
      setValues(initialValue);
    }
  }, []);

  const [values, setValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newValues = [...values, inputValue.trim()];
      setInputValue("");
      setValues(newValues);
      onValueChange(newValues);
    } else if (e.key === "Backspace" && !inputValue && values.length > 0) {
      const newValues = values.slice(0, -1);
      setValues(newValues);
      onValueChange(newValues);
    }
  };

  const removeValue = (indexToRemove: number) => {
    const newValues = values.filter((_, index) => index !== indexToRemove);
    setValues(newValues);
    onValueChange(newValues);
  };

  return (
    <div className="w-full mx-auto my-3">
      <div className="space-y-2">
        <Label htmlFor="description" className="font-mono">
          {label ?? "Enter multiple values"}
        </Label>
        <div
          className="flex flex-wrap gap-2 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {values.map((value, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="h-7 px-2 py-1 gap-1 text-sm"
            >
              {value}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeValue(index);
                }}
                className="ml-1 hover:bg-muted rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${value}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <input
            disabled={disabled}
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="font-mono flex-1 min-w-[120px] outline-none bg-transparent placeholder:text-muted-foreground"
            placeholder={
              values.length === 0
                ? "Type and press Enter to add multiple..."
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
}
