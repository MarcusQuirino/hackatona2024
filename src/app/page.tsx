import { Button } from "@/components/ui/button";
import { SignInButton, SignedOut } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="flex h-[calc(100vh-5rem)] flex-col items-center justify-around">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-8xl font-bold">Xanflis Template ⚡</h1>
        <p className="text-2xl text-muted-foreground">by: Southlike Software</p>
      </div>
      <div>
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </main>
  );
}
