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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarLoaderFullScreenWidth } from "@/components/ui/bar_loader";
import { useState } from "react";
import { createServer } from "@/actions";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateTypesenseServerFormFields,
  CreateTypesenseServerSchema,
} from "@/zod/create_typesense_server";

const AddServer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTypesenseServerFormFields>({
    defaultValues: {
      host: "localhost",
      port: 8108,
      protocol: "http",
    },
    resolver: zodResolver(CreateTypesenseServerSchema),
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateServer: SubmitHandler<
    CreateTypesenseServerFormFields
  > = async (formData) => {
    try {
      const response = await createServer(formData);
      if (response.success) {
        toast.success("Success", {
          description: `${response.value.server.name} created successfully`,
          className: "font-mono",
        });
        reset();
        setDialogOpen(false);
      } else {
        toast.error("Error", {
          description: response.error,
          className: "font-mono",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong",
        className: "font-mono",
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="font-mono">
          Add Server
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <BarLoaderFullScreenWidth loading={isSubmitting} />
        <form onSubmit={handleSubmit(handleCreateServer)}>
          <DialogHeader>
            <DialogTitle className="font-mono">Add a Server </DialogTitle>
            <DialogDescription className="font-mono">
              Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 font-mono">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="Name"
                  className=""
                />
                {errors.name && (
                  <div className="text-destructive text-sm">
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 font-mono">
              <Label htmlFor="api-key" className="text-right">
                API Key
              </Label>
              <div className="col-span-3">
                <Input
                  id="api-key"
                  placeholder="abc"
                  {...register("apiKey")}
                  className=""
                />
                {errors.apiKey && (
                  <div className="text-destructive text-sm">
                    {errors.apiKey.message}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 font-mono">
              <Label htmlFor="host" className="text-right">
                Host
              </Label>
              <div className="col-span-3">
                <Input
                  id="host"
                  placeholder="localhost"
                  className="font-mono"
                  {...register("host")}
                />
                {errors.host && (
                  <div className="text-destructive text-sm font-mono">
                    {errors.host.message}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 font-mono">
              <Label htmlFor="port" className="text-right">
                Port
              </Label>
              <Input
                id="port"
                placeholder="8108"
                className="col-span-3"
                type="number"
                {...register("port")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 font-mono">
              <Label htmlFor="path" className="text-right">
                Path
              </Label>
              <Input
                id="path"
                placeholder="/"
                className="col-span-3"
                {...register("path")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 font-mono">
              <Label htmlFor="role" className="text-right">
                Protocol
              </Label>
              <Select defaultValue="http" {...register("protocol")}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a protocol" />
                </SelectTrigger>
                <SelectContent className="font-mono">
                  <SelectItem value="http">http</SelectItem>
                  <SelectItem value="https">https</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-col gap-2 font-mono">
              <div className="flex flex-row gap-4">
                <ServerCreateHoverCard />
                <Button type="submit" disabled={isSubmitting}>
                  Save changes
                </Button>
              </div>
              {errors.root && (
                <div className="text-destructive">{errors.root.message}</div>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServer;
