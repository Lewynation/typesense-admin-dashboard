"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import {
  addTokenSeparator,
  removeTokenSeparator,
} from "@/redux/slices/create_collection/create_collection";
import { X } from "lucide-react";

const TokenSeparators: React.FC = () => {
  const [tokenSeparator, setTokenSeparator] = useState<string>("");
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const collection = useAppSelector((state) => state.createCollectionSlice);

  const addHandler = () => {
    if (tokenSeparator === "") return;
    dispatch(addTokenSeparator(tokenSeparator));
    setTokenSeparator("");
    setDialogOpen(false);
  };

  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle>Token Separators</CardTitle>
        <CardDescription>
          Special characters to be used for splitting the text into individual
          words.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-4">
          {collection.token_separators?.map((separator, index) => (
            <CancellableItem
              key={index}
              name={separator}
              onRemove={(name) => dispatch(removeTokenSeparator(name))}
            />
          ))}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add Token Separator</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter Token Separator</DialogTitle>
              <DialogDescription>
                Enter you one letter token separator.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="name"
                  className="col-span-4"
                  placeholder="Token Separator"
                  value={tokenSeparator}
                  onChange={(e) => setTokenSeparator(e.target.value[0])}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={addHandler}>
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TokenSeparators;

interface CancellableItemProps {
  name: string;
  onRemove: (name: string) => void;
}

export const CancellableItem: React.FC<CancellableItemProps> = ({
  name,
  onRemove,
}) => {
  return (
    <div className="flex gap-2 bg-slate-400 rounded-lg px-2 py-1 items-center justify-center">
      {name}
      <X size={20} className="cursor-pointer" onClick={() => onRemove(name)} />
    </div>
  );
};
