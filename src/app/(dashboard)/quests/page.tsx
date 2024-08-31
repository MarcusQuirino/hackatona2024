import QuestList from "@/components/quest-list";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QuestsPage() {

  const quests = [1, 2, 3, 4, 5];

  return (
    <main className="flex h-[calc(100vh-12rem)] items-center justify-around">
      <Tabs defaultValue="active" className="w-4/5 h-full pt-10">
        <TabsList className="grid w-1/3 grid-cols-3">
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="waiting">Em espera</TabsTrigger>
          <TabsTrigger value="completed">Concluídas</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="h-full">
          <Card className="h-full">
            <CardContent className="space-y-2 h-full">
              <QuestList quests={quests} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="waiting" className="h-full">
          <Card className="h-full">
            <CardContent className="space-y-2 h-full">
              <QuestList quests={quests} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="h-full">
          <Card className="h-full">
            <CardContent className="space-y-2 h-full">
              <QuestList quests={quests} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
