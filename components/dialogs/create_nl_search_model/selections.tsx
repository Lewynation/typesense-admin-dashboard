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
import { Controller } from "react-hook-form";
import { ConversationModelTypeSchema } from "@/zod/create_conversation_model";
import { useCreateNLSearchModelFieldForm } from "./create_nl_search_model_dialog";
import { NLSearchModelTypeSchema } from "@/zod/create_nl_search_model";

export const NLModelProviderSelection = () => {
  const { control } = useCreateNLSearchModelFieldForm();
  return (
    <div className="grid gap-3 my-3">
      <Label className="font-mono">Model Provider</Label>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(val) => {
              field.onChange(
                NLSearchModelTypeSchema.catch("openai").parse(val),
              );
            }}
          >
            <SelectTrigger className="w-full font-mono">
              <SelectValue placeholder="Select field type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="font-mono">
                  Conversation Model Providers
                </SelectLabel>
                <SelectItem className="font-mono" value="openai">
                  OpenAI
                </SelectItem>
                <SelectItem className="font-mono" value="gcp">
                  GCP Vertex
                </SelectItem>
                <SelectItem className="font-mono" value="cloudflare">
                  Cloudflare Workers AI
                </SelectItem>
                <SelectItem className="font-mono" value="google">
                  Google
                </SelectItem>
                <SelectItem className="font-mono" value="vllm">
                  vLLM
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};
