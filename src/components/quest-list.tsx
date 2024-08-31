import { ArrowRight, UserRoundCheck } from "lucide-react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";

interface QuestListProps {
  quests: number[];
}

export default function QuestList({ quests }: QuestListProps) {
  return (
    <div className="w-full h-full py-4">
      <ScrollArea className="flex h-full w-full flex-col gap-4">
        {quests.map((quest) => (
          <>
            <Card key={quest} className="flex items-center justify-between p-4 rounded-lg border-l-8 border-t-0 border-r-0 border-b-0 border-orange-500">
              <div className="flex items-center space-x-6">
                <UserRoundCheck size={24} />
                <div className="flex items-center space-x-4">
                  <h4 className="font-semibold">Quest Title {quest}</h4>
                </div>
                <Badge
                  variant="outline"
                  className="w-24 justify-center"
                >{`Priority ${quest}`}</Badge>
                  <p className="text-sm text-muted-foreground">
                    Location: Area {quest}
                  </p>
              </div>

              <Link href={`/quests/${quest}`}>
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
