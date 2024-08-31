import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Swords, RefreshCcw, UserRoundCheck, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function BoardPage() {
  return (
    <main className="flex h-[calc(100vh-5rem)] flex-col items-center gap-8 p-8">
      <div className="flex w-full max-w-4xl justify-center gap-8">
        <Card className="w-1/2">
          <CardContent className="flex flex-row items-start p-6">
            <div className="mr-4 h-8 w-8 flex-shrink-0">
              <Swords size={32} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Quests Abertas</h3>
              <p className="text-sm text-muted-foreground">
                Abertas para ajuda
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/2">
          <CardContent className="flex flex-row items-start p-6">
            <div className="mr-4 h-8 w-8 flex-shrink-0">
              <RefreshCcw size={32} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Quests em Andamento</h3>
              <p className="text-sm text-muted-foreground">
                Aguarde notificações
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full max-w-4xl justify-center gap-8">
        <div className="w-1/2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input type="text" placeholder="Enter text here" className="w-1/2" />
      </div>

      <div className="w-full max-w-4xl">
        <ScrollArea className="flex h-[300px] w-full flex-col gap-4">
          {[1, 2, 3, 4, 5].map((quest) => (
            <>
              <Card
                key={quest}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-6">
                  <UserRoundCheck size={24} />
                  <Badge
                    variant="outline"
                    className="w-24 justify-center"
                  >{`Priority ${quest}`}</Badge>
                  <div className="flex items-center space-x-4">
                    <h4 className="font-semibold">Quest Title {quest}</h4>
                    <p className="text-sm text-muted-foreground">
                      Location: Area {quest}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Ver mais <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
              <div className="p-2" />
            </>
          ))}
        </ScrollArea>
      </div>
    </main>
  );
}
