import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ShowRoute } from "./show-route";

export function LayoutHeader() {
  return (
    <header className="flex h-20 flex-row items-center justify-between border-b-foreground p-4 bg-card">
      <ShowRoute />
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
