import { AuthenticationCheckWrapper } from "@/components/shared";

export default function Home() {
  return (
    <AuthenticationCheckWrapper>
      <div>Hello</div>
    </AuthenticationCheckWrapper>
  );
}
