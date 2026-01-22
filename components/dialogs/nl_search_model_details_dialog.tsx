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
import { Badge } from "../ui/badge";
import { useNLSearchModel } from "@/swr/use_nl_search_model";

const ShowNLSearchModelDetailsDialog = ({
  setShowDialog,
  showDialog,
  nlSearchModelId,
}: {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  nlSearchModelId: string | undefined;
}) => {
  const { nlSearchModel, error, isLoading } = useNLSearchModel(
    nlSearchModelId!,
  );

  const isLocal = nlSearchModel && "type" in nlSearchModel;

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
        {nlSearchModel && (
          <div>
            <div className="font-mono">
              <SingleKeyDesc label="Id" value={nlSearchModel.id} />
              {isLocal && (
                <div className="flex gap-2">
                  <p className="font-mono font-semibold">Provider:</p>
                  <Badge className="font-mono">{nlSearchModel.type}</Badge>
                </div>
              )}
              <SingleKeyDesc
                label="Model Name"
                value={nlSearchModel.model_name}
              />
              <SingleKeyDesc
                label="System Prompt"
                value={nlSearchModel.system_prompt ?? "N/A"}
              />
              <SingleKeyDesc
                label="Max Bytes"
                value={nlSearchModel.max_bytes?.toString() ?? "N/A"}
              />
              {isLocal &&
                (nlSearchModel.type === "openai" ||
                  nlSearchModel.type === "google" ||
                  nlSearchModel.type === "cloudflare") && (
                  <SingleKeyDesc
                    label="Api Key"
                    value={nlSearchModel.api_key ?? "N/A"}
                  />
                )}
              {isLocal &&
                (nlSearchModel.type === "openai" ||
                  nlSearchModel.type === "google" ||
                  nlSearchModel.type === "gcp" ||
                  nlSearchModel.type === "vllm") && (
                  <SingleKeyDesc
                    label="Temperature"
                    value={nlSearchModel.temperature?.toString() ?? "N/A"}
                  />
                )}
              {isLocal &&
                (nlSearchModel.type === "google" ||
                  nlSearchModel.type === "gcp") && (
                  <SingleKeyDesc
                    label="top_k"
                    value={nlSearchModel.top_k?.toString() ?? "N/A"}
                  />
                )}
              {isLocal &&
                (nlSearchModel.type === "google" ||
                  nlSearchModel.type === "gcp") && (
                  <SingleKeyDesc
                    label="top_p"
                    value={nlSearchModel.top_p?.toString() ?? "N/A"}
                  />
                )}
              {isLocal && nlSearchModel.type === "cloudflare" && (
                <SingleKeyDesc
                  label="Account Id"
                  value={nlSearchModel.account_id ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "google" && (
                <SingleKeyDesc
                  label="API Version"
                  value={nlSearchModel.api_version ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "gcp" && (
                <SingleKeyDesc
                  label="Access Token"
                  value={nlSearchModel.access_token ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "gcp" && (
                <SingleKeyDesc
                  label="Refresh Token"
                  value={nlSearchModel.refresh_token ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "gcp" && (
                <SingleKeyDesc
                  label="Project Id"
                  value={nlSearchModel.project_id ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "gcp" && (
                <SingleKeyDesc
                  label="Client Id"
                  value={nlSearchModel.client_id ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "gcp" && (
                <SingleKeyDesc
                  label="Client Secret"
                  value={nlSearchModel.client_secret ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "gcp" && (
                <SingleKeyDesc
                  label="Region"
                  value={nlSearchModel.region ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "gcp" && (
                <SingleKeyDesc
                  label="Max Output Tokens"
                  value={nlSearchModel.max_output_tokens?.toString() ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "google" && (
                <div className="flex gap-2">
                  <p className="font-mono font-semibold">Stop Sequences:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {nlSearchModel.stop_sequences &&
                      nlSearchModel.stop_sequences.length > 0 &&
                      nlSearchModel.stop_sequences?.map((seq, index) => (
                        <Badge key={index} className="font-mono">
                          {seq}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}
              {isLocal && nlSearchModel.type === "cloudflare" && (
                <SingleKeyDesc
                  label="Account Id"
                  value={nlSearchModel.account_id ?? "N/A"}
                />
              )}
              {isLocal && nlSearchModel.type === "vllm" && (
                <SingleKeyDesc
                  label="vLLM Api Url"
                  value={nlSearchModel.api_url ?? "N/A"}
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

export const useShowNLSearchModelDetailsDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [nlSearchModelId, setNLSearchModelId] = useState<string | undefined>();

  const NLSearchModelDetailsDialog = () => (
    <ShowNLSearchModelDetailsDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      nlSearchModelId={nlSearchModelId}
    />
  );

  const setShowNLSearchModelDetailsDialog = (
    show: boolean,
    nlSearchModelId: string,
  ) => {
    setNLSearchModelId(nlSearchModelId);
    setShowDialog(show);
  };

  return {
    setShowNLSearchModelDetailsDialog,
    NLSearchModelDetailsDialog,
  };
};
