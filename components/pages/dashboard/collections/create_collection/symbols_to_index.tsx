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
  addSymbolToIndex,
  removeSymbolToIndex,
} from "@/redux/slices/create_collection/create_collection";
import { CancellableItem } from "./token_separators";

const SymbolsToIndex: React.FC = () => {
  const [symbolToindex, setSymbolToindex] = useState<string>("");
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const collection = useAppSelector((state) => state.createCollectionSlice);

  const addHandler = () => {
    if (symbolToindex === "") return;
    dispatch(addSymbolToIndex(symbolToindex));
    setSymbolToindex("");
    setDialogOpen(false);
  };

  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle>Symbols to index</CardTitle>
        <CardDescription>
          List of symbols or special characters to be indexed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-4">
          {collection.symbols_to_index?.map((symbol, index) => (
            <CancellableItem
              key={index}
              name={symbol}
              onRemove={(name) => dispatch(removeSymbolToIndex(name))}
            />
          ))}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add Symbol</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter Symbol</DialogTitle>
              <DialogDescription>
                Enter you one letter symbol to be indexed.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="name"
                  className="col-span-4"
                  placeholder="Symbol"
                  value={symbolToindex}
                  onChange={(e) => setSymbolToindex(e.target.value)}
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

export default SymbolsToIndex;
