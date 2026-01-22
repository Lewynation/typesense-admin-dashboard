"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterComponent from "./register";
import LoginComponent from "./login";

const SusiComponent = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="min-w-sm max-w-sm">
        <Tabs defaultValue="login" className="font-mono">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginComponent />
          </TabsContent>
          <TabsContent value="register">
            <RegisterComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SusiComponent;
