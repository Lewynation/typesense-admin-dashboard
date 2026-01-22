import { auth } from "@/auth/server";
import SusiComponent from "@/components/susi/susi.component";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/");
  }

  return <SusiComponent />;
};

export default LoginPage;
