/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/getUserByClerkId";

export default async function HomePage() {
  const { userId } = auth();

  if (userId !== null) {
    const user = await getUserByClerkId(userId);

    if (!user) {
      redirect("/onboarding");
    }
  }

  return (
    <main className="flex h-[calc(100vh-5rem)] flex-col items-center justify-around">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-8xl font-bold">Xanflis Template ⚡</h1>
        <p className="text-2xl text-muted-foreground">by: Southlike Software</p>
      </div>
      <div className="space-x-4">
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
          <Button>
            <SignUpButton />
          </Button>
        </SignedOut>
      </div>
    </main>
  );
}
