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
import { useConversationModel } from "@/swr/use_conversation_model";
import { Badge } from "../ui/badge";

const ShowConversationModelDetailsDialog = ({
  setShowDialog,
  showDialog,
  conversationModelId,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  conversationModelId: string | undefined;
}) => {
  const { conversationModel, error, isLoading } = useConversationModel(
    conversationModelId!,
  );

  const isLocal = conversationModel && "type" in conversationModel;

  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="font-mono">
            Conversation Model details
          </DialogTitle>
        </DialogHeader>
        {isLoading && <CircularSpinner />}
        {error && <p className="font-mono">An Error occured</p>}
        {conversationModel && (
          <div>
            <div className="font-mono">
              <SingleKeyDesc label="Id" value={conversationModel.id} />
              {isLocal && (
                <div className="flex gap-2">
                  <p className="font-mono font-semibold">Provider:</p>
                  <Badge className="font-mono">{conversationModel.type}</Badge>
                </div>
              )}
              <SingleKeyDesc
                label="Model Name"
                value={conversationModel.model_name}
              />
              <SingleKeyDesc
                label="System Prompt"
                value={conversationModel.system_prompt ?? "N/A"}
              />
              <SingleKeyDesc
                label="Max Bytes"
                value={conversationModel.max_bytes?.toString()}
              />
              <SingleKeyDesc
                label="TTL"
                value={conversationModel.ttl?.toString() ?? "N/A"}
              />
              <SingleKeyDesc
                label="History Collection"
                value={conversationModel.history_collection ?? "N/A"}
              />
              {isLocal &&
                (conversationModel.type === "openai" ||
                  conversationModel.type === "azure" ||
                  conversationModel.type === "google" ||
                  conversationModel.type === "cloudflare") && (
                  <SingleKeyDesc
                    label="Api Key"
                    value={conversationModel.api_key ?? "N/A"}
                  />
                )}
              {isLocal && conversationModel.type === "openai" && (
                <SingleKeyDesc
                  label="Open AI Path"
                  value={conversationModel.openai_path ?? "N/A"}
                />
              )}
              {isLocal && conversationModel.type === "openai" && (
                <SingleKeyDesc
                  label="Open AI Url"
                  value={conversationModel.openai_url ?? "N/A"}
                />
              )}
              {isLocal && conversationModel.type === "azure" && (
                <SingleKeyDesc
                  label="Url"
                  value={conversationModel.url ?? "N/A"}
                />
              )}
              {isLocal && conversationModel.type === "cloudflare" && (
                <SingleKeyDesc
                  label="Account Id"
                  value={conversationModel.account_id ?? "N/A"}
                />
              )}
              {isLocal && conversationModel.type === "vllm" && (
                <SingleKeyDesc
                  label="vLLM Url"
                  value={conversationModel.vllm_url ?? "N/A"}
                />
              )}
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
    <p className="my-1 font-semibold font-mono break-all">
      {label}:<span className="text-base font-normal"> {value}</span>
    </p>
  );
};

export const useShowConversationModelDetailsDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [conversationModelId, setConversationModelId] = useState<
    string | undefined
  >();

  const ConversationModelDetailsDialog = () => (
    <ShowConversationModelDetailsDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      conversationModelId={conversationModelId}
    />
  );

  const setShowConversationModelDetailsDialog = (
    show: boolean,
    conversationModelId: string,
  ) => {
    setConversationModelId(conversationModelId);
    setShowDialog(show);
  };

  return {
    setShowConversationModelDetailsDialog,
    ConversationModelDetailsDialog,
  };
};
