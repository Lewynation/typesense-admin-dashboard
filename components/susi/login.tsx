import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarLoaderFullScreenWidth } from "@/components/ui/bar_loader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import logo from "@/assets/images/logo.png";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/auth/client";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type LoginFormFields = z.infer<typeof loginSchema>;

const LoginComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginFormFields> = async (formData) => {
    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      });
      if (error) {
        return displayErrorMessage(error.message);
      }
      toast.success("Success", {
        description: `${data.user.name} logged in successfully`,
        className: "font-mono",
      });
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        displayErrorMessage(error.message);
      } else {
        displayErrorMessage();
      }
    }
  };

  const displayErrorMessage = (message?: string) => {
    setError("root", {
      message: message ?? "Something went wrong",
    });
    toast.error("Error", {
      description: message ?? "Uh oh! Something went wrong.",
      className: "font-mono",
    });
  };

  return (
    <Card className="w-full">
      <BarLoaderFullScreenWidth loading={isSubmitting} />
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
      <form onSubmit={handleSubmit(handleLogin)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
              required
            />
            {errors.email && (
              <div className="text-destructive text-sm">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Input
              id="password"
              type="password"
              {...register("password")}
              required
              placeholder="Password"
            />
            {errors.password && (
              <div className="text-destructive text-sm">
                {errors.password.message}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-4 flex flex-col gap-2">
          {errors.root && (
            <div className="text-destructive text-sm">
              {errors.root.message}
            </div>
          )}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginComponent;
