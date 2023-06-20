import React from "react";
import {
  Button,
  Input,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  useToast,
  BarLoaderFullScreenWidth,
} from "ui";

const LoginHoverCard = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button className="inline font-oswald" variant={"link"}>
          Have a Question?
        </Button>
        <HoverCardContent>
          <p className="text-xs font-oswald">
            - <span className="font-bold">ApiKey</span>: requires server running
            with enable cors
          </p>
          <p className="text-xs font-oswald">
            - <span className="font-bold">Host</span>: eg localhost
          </p>
          <p className="text-xs font-oswald">
            - <span className="font-bold">Port</span>: default is 8108, if
            typesense server is running behind a reverse proxy, use the port
            number of the reverse proxy. 443 if https and 80 if http
          </p>
          <p className="text-xs font-oswald">
            - <span className="font-bold">Path</span>: optional: leave blank or
            start with / and end without /
          </p>
        </HoverCardContent>
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default LoginHoverCard;
