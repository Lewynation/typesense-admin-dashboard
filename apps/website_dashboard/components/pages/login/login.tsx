"use client";

import React, { useState } from "react";
import Image from "next/image";

import image from "@/images/login_background.jpg";
import {
  Button,
  Input,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  useToast,
} from "ui";
import { useDependencies } from "@/contexts/dependency_provider";
import { TypesenseActions } from "@/dependencies";
import { useRouter } from "next/navigation";
import useLocalStorage from "use-local-storage";
import { LOCAL_STORAGE_KEY } from "@/constants";

const LoginView = () => {
  const dependencies = useDependencies();
  const router = useRouter();
  const [creds, setCreds] = useLocalStorage(LOCAL_STORAGE_KEY, "");
  const { toast } = useToast();

  const [APIKey, setAPIKey] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState<number>(8108);
  const [path, setPath] = useState("");

  const handleLogin = () => {
    // const credentials = {
    //   // apiKey: "Bp0rmw4vwLynHUzZYzs6X1Y7yQbGEfssXCMOlhmFe4Fn1O",
    //   apiKey: "Bp0rmw4vwLynHUzZYzs6X1Y7yQbGEfssXCMOlhmFe4Fn1O19",
    //   host: "typesense.exfinder.ocluse.com",
    //   path: "",
    //   port: 443,
    //   protocol: "https",
    // };
    const credentials = {
      apiKey: APIKey,
      host: host,
      path: path,
      port: port,
      protocol: "http",
    };
    setCreds(JSON.stringify(credentials));
    dependencies?.setTypesense(new TypesenseActions(credentials));
    router.replace("/");
    toast({
      title: "Success",
      description: "Login succesful",
    });
  };

  return (
    <div className="grid h-screen grid-cols-3">
      <div className="relative flex flex-col justify-center w-full h-full col-span-2">
        <h1 className="z-10 px-10 text-4xl leading-normal text-white">
          &quot;We&apos;ve been using Untitled to
          <br /> kick start every new project and
          <br />
          can&apos;t imagine working Without it.&quot;
        </h1>
        <div className="absolute z-10 flex flex-col px-10 text-sm leading-normal text-white bottom-5">
          <p className="text-xl font-bold">Otieno_otieno</p>
          <p>Dev</p>
          <p>Ocluse</p>
        </div>
        <Image
          src={image}
          alt="Login image"
          className="absolute inset-0 object-cover h-screen"
        />
      </div>
      <div className="flex flex-col items-center justify-center px-3">
        <p className="font-sans text-2xl font-bold">Welcome Back</p>
        <p className="font-sans text-sm mb-7">Please enter your details</p>
        <div>
          <Input
            placeholder="ApiKey"
            onChange={(e) => {
              setAPIKey(e.target.value);
            }}
          />
          <Input
            placeholder="Host"
            onChange={(e) => {
              setHost(e.target.value);
            }}
          />
          <Input
            placeholder="Port"
            onChange={(e) => {
              setPort(parseInt(e.target.value));
            }}
          />
          <Input
            placeholder="Path"
            onChange={(e) => {
              setPath(e.target.value);
            }}
          />
          <Button className="w-full mt-9" onClick={handleLogin}>
            Login
          </Button>
        </div>
        <HoverCard>
          <HoverCardTrigger>
            <Button className="inline" variant={"link"}>
              Have a Question?
            </Button>
            <HoverCardContent>
              <p className="font-sans text-xs">
                - ApiKey: requires server running with enable cors
              </p>
              <p className="font-sans text-xs">- Host: eg localhost</p>
              <p className="font-sans text-xs">
                - Port: default is 8108, if typesense server is running behind a
                reverse proxy, use the port number of the reverse proxy. 443 if
                https and 80 if http
              </p>
              <p className="font-sans text-xs">
                - Path: optional: leave blank or start with / and end without /
              </p>
            </HoverCardContent>
          </HoverCardTrigger>
        </HoverCard>
      </div>
    </div>
  );
};

export default LoginView;
