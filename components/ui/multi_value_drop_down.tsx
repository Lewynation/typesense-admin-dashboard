"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MultiSelectDropdownProps {
  options: string[];
  initialSelected?: string[];
  onValueChange?: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelectDropdown({
  options,
  initialSelected = [],
  onValueChange,
  placeholder = "Select options...",
}: MultiSelectDropdownProps) {
  const [selectedValues, setSelectedValues] =
    useState<string[]>(initialSelected);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    let newValues: string[];
    if (selectedValues.includes(option)) {
      newValues = selectedValues.filter((v) => v !== option);
    } else {
      newValues = [...selectedValues, option];
    }
    setSelectedValues(newValues);
    onValueChange?.(newValues);
    setIsOpen(false);
  };

  const removeValue = (valueToRemove: string) => {
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    setSelectedValues(newValues);
    onValueChange?.(newValues);
  };

  // Get available options (not yet selected)
  const availableOptions = options.filter(
    (option) => !selectedValues.includes(option),
  );

  return (
    <div ref={containerRef} className="relative w-full my-2 font-mono">
      <div
        className="flex flex-wrap gap-2 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length === 0 ? (
          <span className="text-muted-foreground">{placeholder}</span>
        ) : (
          selectedValues.map((value) => (
            <Badge
              key={value}
              variant="secondary"
              className="h-7 px-2 py-1 gap-1 text-sm"
            >
              {value}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeValue(value);
                }}
                className="ml-1 hover:bg-muted rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${value}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))
        )}

        <div className="ml-auto flex items-center">
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-md border border-input bg-background shadow-lg">
          {availableOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No more options available
            </div>
          ) : (
            availableOptions.map((option) => (
              <div
                key={option}
                className="px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                onClick={() => toggleOption(option)}
              >
                {option}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
