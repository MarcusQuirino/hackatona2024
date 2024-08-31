import { AvatarFallback } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { CircleUserRound } from "lucide-react";

export default function PerfilPage() {
    return(
        <main className="flex h-[calc(100vh-12rem)] items-center justify-around">
            <Tabs defaultValue="profile" className="w-4/5 h-full pt-10">
                <TabsList className="grid w-1/3 grid-cols-3">
                    <TabsTrigger value="profile">Perfil</TabsTrigger>
                    <TabsTrigger value="stats">Estatísticas</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="h-full">
                    <Card className="h-full">
                        <CardContent className="space-y-2 h-full">
                            <div className="">
                                <div className="columns-3">
                                    <Avatar>
                                        <CircleUserRound className="w-20 h-20 mt-20 ml-16"/>
                                    </Avatar>
                                    <div>
                                        
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="stats" className="h-full">
                    <Card className="h-full">
                        <CardContent className="space-y-2 h-full">
                        
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
}