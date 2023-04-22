import { Inter } from "next/font/google";
import { Button } from "ui";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="font-extralight">
        <Button />
        some content
      </div>
    </main>
  );
}
