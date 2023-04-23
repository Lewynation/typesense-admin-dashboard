"use client";

import React from "react";
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

  const handleLogin = () => {
    const credentials = {
      apiKey: "Bp0rmw4vwLynHUzZYzs6X1Y7yQbGEfssXCMOlhmFe4Fn1O19",
      host: "typesense.exfinder.ocluse.com",
      path: "",
      port: 443,
      protocol: "https",
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
    <div className="grid grid-cols-3 h-screen">
      <div className="h-full w-full relative flex col-span-2 flex-col justify-center">
        <h1 className="z-10 text-white text-4xl leading-normal px-10">
          &quot;We&apos;ve been using Untitled to
          <br /> kick start every new project and
          <br />
          can&apos;t imagine working Without it.&quot;
        </h1>
        <div className="z-10 text-white text-sm leading-normal px-10 absolute bottom-5 flex flex-col">
          <p className="text-xl font-bold">Otieno_otieno</p>
          <p>Dev</p>
          <p>Ocluse</p>
        </div>
        <Image
          src={image}
          alt="Login image"
          className="object-cover absolute h-screen inset-0"
        />
      </div>
      <div className="flex items-center justify-center flex-col px-3">
        <p className="font-bold font-sans text-2xl">Welcome Back</p>
        <p className="font-sans text-sm mb-7">Please enter your details</p>
        <div>
          <Input placeholder="ApiKey" />
          <Input placeholder="Host" />
          <Input placeholder="Port" />
          <Input placeholder="Path" />
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
              <p className="text-xs font-sans">
                - ApiKey: requires server running with enable cors
              </p>
              <p className="text-xs font-sans">- Host: eg localhost</p>
              <p className="text-xs font-sans">
                - Port: default is 8108, if typesense server is running behind a
                reverse proxy, use the port number of the reverse proxy. 443 if
                https and 80 if http
              </p>
              <p className="text-xs font-sans">
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
