import { ArrowRight, UserRoundCheck } from "lucide-react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";
import { db } from "@/server/db";
import { Task } from "@/server/db/schema";

async function getTasks() {
  const tasks = await db.select().from(Task);
  return tasks;
}

export default async function QuestList() {
  const tasks = await getTasks();

  return (
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
                <Badge
                  variant="outline"
                  className="w-24 justify-center"
                >{`Priority ${task.urgency}`}</Badge>
                <p className="text-sm text-muted-foreground">
                  Location: {task.city}, {task.state}
                </p>
              </div>

              <Link href={`/quests/${task.taskId}`}>
                <Button size="sm" className="rounded-full">
                  Ver mais <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
            <div className="p-2" />
          </>
        ))}
      </ScrollArea>
    </div>
  );
}
