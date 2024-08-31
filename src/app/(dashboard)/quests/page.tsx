/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import QuestList from "@/components/quest-list";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@react-email/components";
import { UserRoundCheck, Badge, Link, ArrowRight } from "lucide-react";
import { eq } from "drizzle-orm";
import { getUserByClerkId } from "@/lib/getUserByClerkId";
import { UserTask, Task } from "@/server/db/schema";

async function getMyTasks(userId: string) {
  const tasks = await db.query.UserTask.findMany({
    where: eq(UserTask.userId, userId),
  });
  return tasks;
}

async function getTasks(task: string) {
  const tasks = await db.query.Task.findMany({
    where: eq(Task.taskId, task),
  });
  return tasks;
}

export default async function QuestsPage() {
  const { userId } = auth();
  if (userId === null) {
    return;
  }
  const user = await getUserByClerkId(userId);

  if (!user) {
    return;
  }

  const myTasks = await getMyTasks(user.userId);

  const id = myTasks?.[0]?.taskId;

  if (!id) {
    return;
  }

  const tasks = await getTasks(id);

  if (!tasks) {
    return;
  }

  return (
    <main className="flex h-[calc(100vh-12rem)] items-center justify-around">
      <Tabs defaultValue="active" className="h-full w-4/5 pt-10">
        <TabsList className="grid w-1/3 grid-cols-3">
          <TabsTrigger value="active">Ativas</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="h-full">
          <Card className="h-full">
            <CardContent className="h-full space-y-2">
              <div className="h-full w-full py-4">
                <ScrollArea className="flex h-full w-full flex-col gap-4">
                  {tasks.map((task) => (
                    <>
                      <Card
                        key={task.taskId}
                        className="flex items-center justify-between rounded-lg border-b-0 border-l-8 border-r-0 border-t-0 border-orange-500 p-4"
                      >
                        <div className="flex items-center space-x-6">
                          <UserRoundCheck size={24} />
                          <div className="flex items-center space-x-4">
                            <h4 className="font-semibold">{task.name}</h4>
                          </div>
                          <Badge className="w-24 justify-center">{`Priority ${task.status}`}</Badge>
                          <p className="text-sm text-muted-foreground">
                            Location: {task.city}, {task.state}
                          </p>
                        </div>

                        <Link href={`/quests/${task.taskId}`}>
                          <Button className="rounded-full">
                            Ver mais <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </Card>
                      <div className="p-2" />
                    </>
                  ))}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="waiting" className="h-full">
          <Card className="h-full">
            <CardContent className="h-full space-y-2">
              <QuestList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="h-full">
          <Card className="h-full">
            <CardContent className="h-full space-y-2">
              <QuestList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
