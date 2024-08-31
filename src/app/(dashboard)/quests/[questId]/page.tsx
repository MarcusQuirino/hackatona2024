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

export default function QuestPage({ params }: { params: { questId: string } }) {
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
            <h2 className="text-4xl font-bold">Quest Title</h2>
            <div className="mt-3 flex items-center justify-center text-xl text-gray-600">
              <MapPin className="mr-2 h-5 w-5" />
              <span>Quest Location</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-yellow-500 px-4 py-2 text-xl text-white">
              High Priority
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col px-6">
          <p className="mb-6 text-xl">Quest ID: {params.questId}</p>
          <ScrollArea className="flex-grow rounded-md border">
            <div className="p-6">
              <h3 className="mb-4 text-2xl font-semibold">Description</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Embark on an epic journey to the treacherous Misty Mountains.
                Your task is to retrieve the legendary Sword of a Thousand
                Truths, said to be guarded by an ancient dragon. Navigate
                through perilous terrain, solve cryptic riddles, and face
                formidable foes as you quest for glory and riches beyond
                imagination.
              </p>
              <div className="mt-8">
                <h3 className="mb-4 text-2xl font-semibold">Objectives</h3>
                <ul className="list-inside list-disc space-y-2 text-lg text-gray-700">
                  <li>Reach the Misty Mountains</li>
                  <li>{"Locate the dragon's lair"}</li>
                  <li>Retrieve the Sword of a Thousand Truths</li>
                  <li>Return safely to claim your reward</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-gray-500" />
            <span className="text-lg text-gray-600">8/12 participantes</span>
          </div>
          <Badge className="bg-green-500 px-4 py-2 text-lg text-white">
            Em andamento
          </Badge>
          <Button
            size="lg"
            className="bg-blue-500 text-lg text-white hover:bg-blue-600"
          >
            Voluntariar-se
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
