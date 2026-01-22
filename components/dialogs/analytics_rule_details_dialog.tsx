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
import { Button } from "@/components/ui/button";
import { CircularSpinner } from "../ui/circular_spinner";
import { useAnalyticsRule } from "@/swr/use_analytics_rule";
import { Badge } from "../ui/badge";
import { Minus } from "lucide-react";

const ShowAnalyticsRuleDetailsDialog = ({
  setShowDialog,
  showDialog,
  analyticsRuleName,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  analyticsRuleName: string | undefined;
}) => {
  const { analyticsRule, error, isLoading } = useAnalyticsRule(
    analyticsRuleName!
  );

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="font-mono">
            Analytics Rule details
          </DialogTitle>
        </DialogHeader>
        {isLoading && <CircularSpinner />}
        {error && <p className="font-mono">An Error occured</p>}
        {analyticsRule && (
          <div>
            <div className="font-mono">
              <SingleKeyDesc label="Name" value={analyticsRule.name ?? "N/A"} />
              <SingleKeyDesc label="Type" value={analyticsRule.type} />
              {analyticsRule.params?.limit && (
                <SingleKeyDesc
                  label="Limit"
                  value={analyticsRule.params?.limit?.toString() ?? "N/A"}
                />
              )}
              <SingleKeyDesc
                label="Expand Query"
                value={
                  analyticsRule.params?.expand_query === true ? "TRUE" : "FALSE"
                }
              />
              <SingleKeyDesc
                label="Enable Auto Generation"
                value={
                  analyticsRule.params?.enable_auto_aggregation === true
                    ? "TRUE"
                    : "FALSE"
                }
              />
            </div>
            <div className="my-2">
              <div className="font-mono font-semibold">Source</div>
              <div className="pl-3 border-l">
                <div className="flex gap-3">
                  <div className="font-mono font-semibold">Collections:</div>
                  <div className="flex flex-wrap gap-2">
                    {analyticsRule.params?.source?.collections?.map(
                      (collection, index) => (
                        <Badge key={index} className="font-mono">
                          {collection}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                {analyticsRule.params?.source?.events && (
                  <div className="">
                    <div className="font-mono font-semibold">Events:</div>
                    <div className="flex flex-col gap-2 pl-3">
                      {analyticsRule.params?.source?.events?.map(
                        (event, index) => (
                          <div key={index} className="flex gap-1 border-l">
                            <Minus />
                            <div>
                              <p className="font-semibold font-mono">
                                Name:
                                <span className="text-base font-normal">
                                  {" "}
                                  {event.name}
                                </span>
                              </p>
                              {event.weight && (
                                <p className="font-semibold font-mono">
                                  Weight:
                                  <span className="text-base font-normal">
                                    {" "}
                                    {event.weight}
                                  </span>
                                </p>
                              )}
                              <p className="font-semibold font-mono">
                                Type:
                                <span className="text-base font-normal">
                                  {" "}
                                  {event.type}
                                </span>
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="my-2">
              <div className="font-mono font-semibold">Destination</div>
              <div className="pl-3 border-l">
                <div className="flex gap-3">
                  <div className="font-mono font-semibold">Collection:</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="font-mono">
                      {analyticsRule.params?.destination?.collection}
                    </Badge>
                  </div>
                </div>
                {analyticsRule.params?.destination?.counter_field && (
                  <div className="flex gap-3">
                    <div className="font-mono font-semibold">
                      Counter Field:
                    </div>
                    <div className="flex flex-wrap gap-2 font-mono">
                      {analyticsRule.params?.destination?.counter_field}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="font-mono">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SingleKeyDesc = ({ label, value }: { label: string; value: string }) => {
  return (
    <p className="my-1 font-semibold font-mono">
      {label}:<span className="text-base font-normal"> {value}</span>
    </p>
  );
};

export const useShowAnalyticsRuleDetailsDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [analyticsRuleName, setAnalyticsRuleName] = useState<
    string | undefined
  >();

  const AnalyticsRuleDetailsDialog = () => (
    <ShowAnalyticsRuleDetailsDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      analyticsRuleName={analyticsRuleName}
    />
  );

  const setShowAnalyticsRuleDetailsDialog = (
    show: boolean,
    analyticsRuleName: string
  ) => {
    setAnalyticsRuleName(analyticsRuleName);
    setShowDialog(show);
  };

  return {
    setShowAnalyticsRuleDetailsDialog,
    AnalyticsRuleDetailsDialog,
  };
};
