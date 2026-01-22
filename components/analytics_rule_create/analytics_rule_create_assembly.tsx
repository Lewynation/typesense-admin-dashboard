"use client";

import {
  AnalyticsRuleTypeSchema,
  CreateAnalyticsRuleField,
  CreateAnalyticsRuleFieldSchema,
} from "@/zod/create_analytics_rule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";
import MultiValueInput from "../ui/multi_value_input";
import LabelledInput from "../dialogs/add_collection_field/labelled_input";
import AnalyticsSourceRules from "./source_rule";
import AnalyticsDestinationRules from "./destination_rule";
import { flattenReactFormErrors } from "@/lib/flatter_react_form_errors";
import { Button } from "../ui/button";
import { createAnalyticsRule } from "@/actions";
import { generateAnalyticsRuleCreateSchemaFromZodModel } from "@/lib/analytics_rule_create_utils";
import { toast } from "sonner";
import { BarLoaderFullScreenWidth } from "../ui/bar_loader";
import { AnalyticsRuleSchema } from "typesense/lib/Typesense/AnalyticsRule";

const AnalyticsRuleCreateAssembly = ({
  analyticsRule,
}: {
  analyticsRule?: AnalyticsRuleSchema;
}) => {
  const methods = useForm<CreateAnalyticsRuleField>({
    defaultValues: {
      name: analyticsRule?.name,
      type: analyticsRule?.type,
      destination: {
        collection: analyticsRule?.params.destination?.collection,
        counter_field: analyticsRule?.params.destination?.counter_field,
      },
      enable_auto_aggregation: analyticsRule?.params.enable_auto_aggregation,
      expand_query: analyticsRule?.params.expand_query,
      limit: analyticsRule?.params.limit,
      source: {
        collections: analyticsRule?.params.source.collections,
        events: analyticsRule?.params.source.events,
      },
    },
    resolver: zodResolver(CreateAnalyticsRuleFieldSchema),
  });
  const params = useParams<{ id: string }>();
  const isRuleEidt = !!analyticsRule;

  const handleCreateAnalyticsRuleSubmission: SubmitHandler<
    CreateAnalyticsRuleField
  > = async (formData) => {
    try {
      const analyticsRule = await createAnalyticsRule(
        params.id,
        formData.name,
        generateAnalyticsRuleCreateSchemaFromZodModel(formData),
      );
      if (!analyticsRule.success) {
        methods.setError("root", {
          message: analyticsRule.error,
        });
        toast.error("Error", {
          description: analyticsRule.error,
        });
        return;
      }
      toast.success(`Analytics Rule ${isRuleEidt ? "Edited" : "Created"}`, {
        description: `${analyticsRule?.value?.name} ${isRuleEidt ? "edited" : "created"} successfully`,
        className: "font-mono",
      });
      methods.reset();
    } catch (error) {
      toast.error("Error creating analytics rule", {
        description: `There was an error creating your analytics rule`,
        className: "font-mono",
      });
      methods.setError("root", {
        message: "There was an error creating your analytics rule",
      });
    }
  };

  const errors = methods.formState.errors;

  return (
    <div className="mt-5">
      {methods.formState.isSubmitting && (
        <BarLoaderFullScreenWidth loading={methods.formState.isSubmitting} />
      )}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleCreateAnalyticsRuleSubmission)}
        >
          <LabelledInput
            id="name"
            disabled={isRuleEidt}
            placeHolder="Enter Analytics Rule Name"
            title="Name"
            {...methods.register("name", {
              setValueAs: (v) => (v === "" ? undefined : v),
            })}
          />
          <div className="grid gap-3 my-3">
            <Label className="font-mono">Rule Type</Label>
            <Controller
              name="type"
              control={methods.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(
                      AnalyticsRuleTypeSchema.catch("popular_queries").parse(
                        val,
                      ),
                    );
                  }}
                >
                  <SelectTrigger className="w-full font-mono">
                    <SelectValue placeholder="Select Analytics Rule Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="font-mono">
                        Rule Types
                      </SelectLabel>
                      <SelectItem className="font-mono" value="popular_queries">
                        Popular Queries
                      </SelectItem>
                      <SelectItem className="font-mono" value="nohits_queries">
                        No Hit Queries
                      </SelectItem>
                      <SelectItem className="font-mono" value="counter">
                        Counter
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Controller
            name="meta_fields"
            control={methods.control}
            render={({ field }) => (
              <MultiValueInput
                initialValue={field.value}
                label="Meta Fields (optional)"
                onValueChange={(values) => {
                  field.onChange(values);
                }}
              />
            )}
          />
          <LabelledInput
            id="limit"
            placeHolder="Enter Limit"
            title="Limit (optional)"
            type="number"
            {...methods.register("limit", {
              required: false,
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
          />
          <Controller
            name="enable_auto_aggregation"
            control={methods.control}
            render={({ field }) => (
              <div className="flex items-start gap-3 my-3">
                <Checkbox
                  id="enable_auto_aggregation"
                  checked={field.value}
                  onCheckedChange={(e) => {
                    field.onChange(e.valueOf());
                  }}
                />
                <div className="grid gap-2">
                  <Label
                    htmlFor="enable_auto_aggregation"
                    className="font-mono"
                  >
                    Enable Auto Aggregation (optional)
                  </Label>
                  <p className="text-muted-foreground text-sm font-mono">
                    By setting enable_auto_aggregation to false, only the search
                    queries sent via the API will be aggregated.
                  </p>
                </div>
              </div>
            )}
          />
          <Controller
            name="expand_query"
            control={methods.control}
            render={({ field }) => (
              <div className="flex items-start gap-3 my-3">
                <Checkbox
                  id="expand_query"
                  checked={field.value}
                  onCheckedChange={(e) => {
                    field.onChange(e.valueOf());
                  }}
                />
                <div className="grid gap-2">
                  <Label htmlFor="expand_query" className="font-mono">
                    Expand Query (optional)
                  </Label>
                  <p className="text-muted-foreground text-sm font-mono">
                    Set expand_query: true to make Typesense aggregate the
                    expanded versions of the search queries made.
                  </p>
                </div>
              </div>
            )}
          />
          <AnalyticsSourceRules />
          <AnalyticsDestinationRules />
          <div className="my-5">
            {flattenReactFormErrors(errors).map((error, index) => (
              <p
                className="text-destructive text-sm font-mono w-full break-all"
                key={index}
              >
                {error}
              </p>
            ))}
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="font-mono">
              {isRuleEidt ? "Edit" : "Create"} Analytics Rule
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export const useCreateAnalyticsRuleForm = () =>
  useFormContext<CreateAnalyticsRuleField>();

export default AnalyticsRuleCreateAssembly;
