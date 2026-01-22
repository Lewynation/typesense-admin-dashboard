"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Eye, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsRuleSchema } from "typesense/lib/Typesense/AnalyticsRule";
import { useShowAnalyticsRuleDetailsDialog } from "../dialogs/analytics_rule_details_dialog";
import { useShowResourceDeletionConfirmationDialog } from "../dialogs/resource_deletion_confirmation_dialog";
import { useParams } from "next/navigation";
import { deleteAnalyticsRule } from "@/actions";
import Link from "next/link";

const AnalyticsRulesRowActions = (analyticsRule: AnalyticsRuleSchema) => {
  const params = useParams<{ id: string }>();

  const { AnalyticsRuleDetailsDialog, setShowAnalyticsRuleDetailsDialog } =
    useShowAnalyticsRuleDetailsDialog();
  const {
    ResourceDeletionConfirmationDialog,
    setShowResourceDeletionConfirmationDialog,
  } = useShowResourceDeletionConfirmationDialog(
    () => deleteAnalyticsRule(params.id, analyticsRule.name),
    "Analytics Rule",
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <AnalyticsRuleDetailsDialog />
      <ResourceDeletionConfirmationDialog />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                setShowAnalyticsRuleDetailsDialog(true, analyticsRule.name);
              }}
            >
              <Eye className="h-5 w-5" />
              <span className="sr-only">View</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">View</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
            >
              <Link
                href={`analytics-rules/${analyticsRule.name}/edit-analytics-rule`}
              >
                <Pencil className="h-5 w-5" />
                <span className="sr-only">Edit</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Edit</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
              onClick={() => {
                setShowResourceDeletionConfirmationDialog(true);
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
    </div>
  );
};

export default AnalyticsRulesRowActions;
