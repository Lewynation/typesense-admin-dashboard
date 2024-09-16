"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  BarLoaderFullScreenWidth,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks";
import logo from "@/assets/images/logo.png";
import { login } from "@/actions";

interface LoginViewProps {
  children: React.ReactNode;
}

const LoginView: React.FC<LoginViewProps> = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("email", email);
      formData.set("password", password);
      const response = await login(formData);
      console.log(response);
      if (!response?.error) {
        router.replace("/");
      } else {
        console.log(response?.error);
        toast({
          title: "Error",
          content: "Uh oh! Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        content: "Uh oh! Something went wrong.",
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {children}
      <BarLoaderFullScreenWidth loading={loading} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex flex-col w-full items-center justify-center my-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={logo.src} />
              <AvatarFallback>o_O</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl leading-tight uppercase font-oswald ">
              t y p e s e n s e
            </h1>
            <h2 className="text-base leading-tight uppercase font-oswald ">
              D a s h b o a r d
            </h2>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginView;
