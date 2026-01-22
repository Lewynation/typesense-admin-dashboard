"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";
import {
  AnalyticsRuleEvent,
  AnalyticsRuleEventSchema,
} from "@/zod/create_analytics_rule";
import { flattenReactFormErrors } from "@/lib/flatter_react_form_errors";

const ShowCreateAnalyticsRuleEventDialog = ({
  setShowDialog,
  showDialog,
  event,
  onEventCreated,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  event: AnalyticsRuleEvent | undefined;
  onEventCreated?: (event: AnalyticsRuleEvent) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AnalyticsRuleEvent>({
    defaultValues: {
      name: event?.name,
      type: event?.type,
      weight: event?.weight,
    },
    resolver: zodResolver(AnalyticsRuleEventSchema),
  });

  const isEventEdit = !!event;

  const handleAnalyticsEventSubmission: SubmitHandler<
    AnalyticsRuleEvent
  > = async (formData) => {
    if (onEventCreated) {
      onEventCreated(formData);
    }
    setShowDialog(false);
  };

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitting && <BarLoaderFullScreenWidth loading={isSubmitting} />}
        <form>
          <DialogHeader>
            <DialogTitle className="font-mono">
              {isEventEdit ? "Edit" : "Create"} an analytics event
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 my-3">
            <div className="grid gap-3">
              <Label htmlFor="type" className="font-mono">
                Type
              </Label>
              <Input
                {...register("type")}
                id="type"
                name="type"
                placeholder="Enter Event Type"
                className="font-mono"
              />
            </div>
          </div>
          <div className="grid gap-4 my-3">
            <div className="grid gap-3">
              <Label htmlFor="name" className="font-mono">
                Name
              </Label>
              <Input
                {...register("name")}
                id="name"
                name="name"
                placeholder="Enter Event Name"
                className="font-mono"
              />
            </div>
          </div>
          <div className="grid gap-4 my-3">
            <div className="grid gap-3">
              <Label htmlFor="weight" className="font-mono">
                Weight (optional)
              </Label>
              <Input
                {...register("weight", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                id="weight"
                name="weight"
                type="number"
                placeholder="Enter Event Weight"
                className="font-mono"
              />
            </div>
          </div>
          <div>
            {flattenReactFormErrors(errors).map((error, index) => (
              <p
                className="text-destructive text-sm font-mono w-full break-all"
                key={index}
              >
                {error}
              </p>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="font-mono">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="font-mono"
              onClick={handleSubmit(handleAnalyticsEventSubmission)}
            >
              {isEventEdit ? "Edit" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const useCreatenalyticsRuleEventDialog = (
  onEventCreated?: (event: AnalyticsRuleEvent) => void,
) => {
  const [showDialog, setShowDialog] = useState(false);
  const [event, setEvent] = useState<AnalyticsRuleEvent | undefined>();

  const CreateAnalyticsRuleEventDialog = () => (
    <ShowCreateAnalyticsRuleEventDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      event={event}
      onEventCreated={onEventCreated}
    />
  );

  const setShowCreateAnalyticsRuleEventDialog = (
    show: boolean,
    event?: AnalyticsRuleEvent,
  ) => {
    setShowDialog(show);
    setEvent(event);
  };

  return {
    setShowCreateAnalyticsRuleEventDialog,
    CreateAnalyticsRuleEventDialog,
  };
};
