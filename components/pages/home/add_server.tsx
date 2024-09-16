"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ServerCreateHoverCard from "./hover_card";
import {
  BarLoaderFullScreenWidth,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useState } from "react";
import { createServer } from "@/actions";
import { useToast } from "@/hooks";

const AddServer = () => {
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState(8108);
  const [path, setPath] = useState("");
  const [protocol, setProtocol] = useState("http");
  const [loading, setLoading] = useState(false);

  const handleCreateServer = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!name || !apiKey || !host) {
      toast({
        title: "Error",
        description: "Missing required fields [name, apikey, host]",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    formData.set("name", name);
    formData.set("apiKey", apiKey);
    formData.set("protocol", protocol);
    formData.set("host", host);
    formData.set("path", path);
    formData.set("port", port.toString());
    try {
      setLoading(true);
      await createServer(formData);
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
      setName("");
      setApiKey("");
      setHost("");
      setPort(8108);
      setPath("");
      setProtocol("http");
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Server</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <BarLoaderFullScreenWidth loading={loading} />
        <form onSubmit={handleCreateServer}>
          <DialogHeader>
            <DialogTitle>Add a Server </DialogTitle>
            <DialogDescription>Click save when youre done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name"
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right">
                API Key
              </Label>
              <Input
                id="api-key"
                placeholder="abc"
                className="col-span-3"
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="host" className="text-right">
                Host
              </Label>
              <Input
                id="host"
                placeholder="localhost"
                className="col-span-3"
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">
                Port
              </Label>
              <Input
                id="port"
                placeholder="8108"
                className="col-span-3"
                type="number"
                onChange={(e) => setPort(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="path" className="text-right">
                Path
              </Label>
              <Input
                id="path"
                placeholder="/"
                className="col-span-3"
                onChange={(e) => setPath(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Protocol
              </Label>
              <Select defaultValue="http" onValueChange={(e) => setProtocol(e)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="http">http</SelectItem>
                  <SelectItem value="https">https</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <ServerCreateHoverCard />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServer;
