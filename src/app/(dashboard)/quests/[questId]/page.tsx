/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, Sword, Badge, MapPin, Users } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/server/db";
import { Task, UserTask } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/getUserByClerkId";

async function getQuest(questId: string) {
  const quest = await db.query.Task.findFirst({
    where: eq(Task.taskId, questId),
  });
  return quest;
}

async function createUserTask(formData: FormData) {
  "use server";

  const userId = formData.get("userId") as string;
  const organizationId = formData.get("organizationId") as string;
  const taskId = formData.get("taskId") as string;

  try {
    await db.insert(UserTask).values({
      userId,
      organizationId,
      taskId,
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to create user task:", error);
    return { success: false, error: "Failed to create user task" };
  }
}

export default async function QuestPage({
  params,
}: {
  params: { questId: string };
}) {
  const quest = await getQuest(params.questId);

  if (!quest) {
    return <div>Ação não encontrada</div>;
  }

  const { userId } = auth();

  if (!userId) {
    return;
  }

  const id = await getUserByClerkId(userId);

  if (!id) {
    return;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="relative flex h-[900px] w-[1000px] flex-col">
        <div className="absolute right-6 top-6">
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              <ArrowLeftToLine className="mr-2 h-5 w-5" /> Voltar
            </Button>
          </Link>
        </div>
        <CardHeader className="flex flex-row items-center justify-between pt-20">
          <div className="flex items-center space-x-6">
            <Sword className="h-12 w-12" />
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold">{quest.name}</h2>
            <div className="mt-3 flex items-center justify-center text-xl text-gray-600">
              <MapPin className="mr-2 h-5 w-5" />
              <span>
                {quest.city}, {quest.state}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-yellow-500 px-4 py-2 text-xl text-white">
              Priority {quest.urgency}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col px-6">
          <p className="mb-6 text-xl">Quest ID: {quest.taskId}</p>
          <ScrollArea className="flex-grow rounded-md border">
            <div className="p-6">
              <h3 className="mb-4 text-2xl font-semibold">Description</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {quest.description}
              </p>
              {/* Add objectives if available in the quest data */}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-gray-500" />
            <span className="text-lg text-gray-600">
              {5}/{9} participantes
            </span>
          </div>
          <Badge className="bg-green-500 px-4 py-2 text-lg text-white">
            {quest.status}
          </Badge>
          <form action={createUserTask}>
            <input type="hidden" name="userId" value={id.userId} />
            <input
              type="hidden"
              name="organizationId"
              value={quest.organizationId}
            />
            <input type="hidden" name="taskId" value={quest.taskId} />
            <Button
              type="submit"
              size="lg"
              className="bg-blue-500 text-lg text-white hover:bg-blue-600"
            >
              Voluntariar-se
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
