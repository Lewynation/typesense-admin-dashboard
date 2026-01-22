"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDialog } from "@/components/dialogs/dialog_provider";
import ResourceReadmore from "../shared/resource_readmore";
import { DocumentationLinks } from "@/config/documentaion_links";

const ConversationModelsHeader = () => {
  const { showCreateConversationModelDialog } = useDialog();
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="font-mono">Conversation Models</CardTitle>
        <CardDescription className="font-mono text-balance max-w-lg leading-relaxed">
          Typesense has the ability to respond to free-form questions, with
          conversational responses and also maintain context for follow-up
          questions and answers.
          <ResourceReadmore link={DocumentationLinks.conversationModels} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="font-mono"
          onClick={() => {
            showCreateConversationModelDialog(true);
          }}
        >
          Create A Conversation Model
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConversationModelsHeader;
