import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuestPage({ params }: { params: { questId: string } }) {
  return (
    <main className="p-8">
      <Link href="/dashboard">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </Link>
      <h1 className="mb-4 text-2xl font-bold">Quest Details</h1>
      <p>Quest ID: {params.questId}</p>
      {/* Add more quest details here */}
    </main>
  );
}
