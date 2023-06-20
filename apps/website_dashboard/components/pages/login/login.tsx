"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, useToast, BarLoaderFullScreenWidth } from "ui";
import { useDependencies } from "@/contexts/dependency_provider";
import { TypesenseActions } from "@/dependencies";
import { useRouter } from "next/navigation";
import useLocalStorage from "use-local-storage";
import { LOCAL_STORAGE_KEY } from "@/constants";
import { ToastAction } from "ui/lib/toast";
import HoverCard from "./hover_card";
import LoginLogoSection from "./login_logo_section";
import RadioButtonGroup from "./radio_button_group";

const LoginView = () => {
  const dependencies = useDependencies();
  const router = useRouter();
  const [creds, setCreds] = useLocalStorage(LOCAL_STORAGE_KEY, "");
  const { toast } = useToast();

  const [APIKey, setAPIKey] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState<number>(8108);
  const [path, setPath] = useState("");
  const [protocol, setProtocol] = useState("http");
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(() => {
    setLoading(true);
    const credentials = {
      apiKey: APIKey,
      host: host,
      path: path,
      port: port,
      protocol: protocol,
    };
    setCreds(JSON.stringify(credentials));
    dependencies?.setTypesense(new TypesenseActions(credentials));
  }, [APIKey, host, path, port, protocol, setCreds, dependencies]);

  useEffect(() => {
    if (!loading) return;
    dependencies?.typesense
      ?.getHealth()
      .then((res) => {
        if (res && res.ok) {
          router.replace("/");
          toast({
            className: "font-oswald",
            title: "Success",
            description: "Login succesful",
          });
        } else {
          console.log("no res");
        }
      })
      .catch((err) => {
        toast({
          className: "font-oswald",
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "There was a problem with your request. Confirm the details and try again.",
          action: (
            <ToastAction altText="Try again" onClick={handleLogin}>
              Try again
            </ToastAction>
          ),
        });
        dependencies?.setTypesense(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router, toast, handleLogin, dependencies, loading]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#f5f7fb]">
      <BarLoaderFullScreenWidth loading={loading} />
      <div className="flex gap-10 px-10 py-3 bg-white">
        <LoginLogoSection />
        <div className="flex flex-col items-center justify-center px-3">
          <p className="mt-2 mb-3 text-sm font-oswald">Login to your server</p>
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
            <RadioButtonGroup setProtocol={setProtocol} />
            <Button className="w-full mt-4 font-oswald" onClick={handleLogin}>
              Login
            </Button>
          </div>
          <HoverCard />
        </div>
      </div>
    </div>
  );
};

export default LoginView;
