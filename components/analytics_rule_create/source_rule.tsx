import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCollections } from "@/swr/use_collections";
import { Label } from "@/components/ui/label";
import { Controller, useFieldArray } from "react-hook-form";
import { useCreateAnalyticsRuleForm } from "./analytics_rule_create_assembly";
import { MultiSelectDropdown } from "../ui/multi_value_drop_down";
import { MousePointerClick, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useCreatenalyticsRuleEventDialog } from "../dialogs/create_analytics_rule_event_dialog";
import { AnalyticsRuleEvent } from "@/zod/create_analytics_rule";
import SourceRuleEventRowActions from "./source_rule_event_row_actions";

const AnalyticsSourceRules = () => {
  const { collections } = useCollections();
  const { control } = useCreateAnalyticsRuleForm();
  const { append } = useFieldArray({
    name: "source.events",
    control,
  });
  const {
    CreateAnalyticsRuleEventDialog,
    setShowCreateAnalyticsRuleEventDialog,
  } = useCreatenalyticsRuleEventDialog((e) => append(e));

  return (
    <div className="my-5">
      <CreateAnalyticsRuleEventDialog />
      <h1 className="font-mono font-bold text-xl mb-4">Source Rules</h1>
      <div className="md:pl-10 pl-5 border-l">
        <div className="grid gap-3 mb-3">
          <Controller
            name="source.collections"
            control={control}
            render={({ field }) => (
              <>
                <Label className="font-mono">Source Collections</Label>
                <MultiSelectDropdown
                  options={
                    collections?.map((collection) => collection.name) ?? []
                  }
                  initialSelected={field.value}
                  placeholder="Select the source collections"
                  onValueChange={(values) => {
                    field.onChange(values);
                  }}
                />
              </>
            )}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <MousePointerClick />
            <h2 className="font-mono font-semibold ">Source Events</h2>
          </div>
          <div>
            {
              <Button
                className="font-mono"
                variant={"secondary"}
                type="button"
                onClick={() => {
                  setShowCreateAnalyticsRuleEventDialog(true, undefined);
                }}
              >
                <Plus />
                Add Event
              </Button>
            }
          </div>
        </div>
        <Events />
      </div>
    </div>
  );
};

const Events = () => {
  const { watch } = useCreateAnalyticsRuleForm();
  const events = watch("source.events");

  return (
    <div className="mt-3 px-5">
      {!events ||
        (events.length === 0 && (
          <div className="flex justify-center items-center font-mono my-4 text-center">
            There are no events to show
            <br />
            Events are optional depending on the rule type
          </div>
        ))}
      {events && events.length > 0 && (
        <Table className="border rounded-2xl">
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Event Name</TableHead>
              <TableHead className="font-mono font-bold">Event Type</TableHead>
              <TableHead className="font-mono font-bold">
                Event Weight
              </TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <SingleEvent event={event} index={index} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

const SingleEvent = ({
  event,
  index,
}: {
  event: AnalyticsRuleEvent;
  index: number;
}) => {
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{event.name}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{event.type}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono">{event.weight?.toString() ?? "N/A"}</div>
      </TableCell>
      <TableCell className="text-right">
        <SourceRuleEventRowActions event={event} index={index} />
      </TableCell>
    </TableRow>
  );
};

export default AnalyticsSourceRules;
