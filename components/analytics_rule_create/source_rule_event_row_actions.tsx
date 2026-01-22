"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import { AnalyticsRuleEvent } from "@/zod/create_analytics_rule";
import { useCreateAnalyticsRuleForm } from "./analytics_rule_create_assembly";
import { useCreatenalyticsRuleEventDialog } from "../dialogs/create_analytics_rule_event_dialog";

const SourceRuleEventRowActions = ({
  event,
  index,
}: {
  event: AnalyticsRuleEvent;
  index: number;
}) => {
  const { control } = useCreateAnalyticsRuleForm();
  const { remove, update } = useFieldArray({
    name: "source.events",
    control,
  });
  const {
    CreateAnalyticsRuleEventDialog,
    setShowCreateAnalyticsRuleEventDialog,
  } = useCreatenalyticsRuleEventDialog((f) => {
    update(index, f);
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <CreateAnalyticsRuleEventDialog />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                setShowCreateAnalyticsRuleEventDialog(true, event);
              }}
            >
              <div>
                <Pencil className="h-5 w-5 " />
                <span className="sr-only">Edit</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Edit</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
                onClick={() => {
                  remove(index);
                }}
              >
                <div>
                  <Trash className="h-5 w-5 text-destructive" />
                  <span className="sr-only">Delete</span>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    </div>
  );
};

export default SourceRuleEventRowActions;
