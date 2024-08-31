import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function OrganizacaoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <div className="flex">
          <div className="flex-1 p-6">
            <CardHeader>
              <CardTitle className="text-2xl">
                Informações da Organização
              </CardTitle>
              <CardDescription className="text-lg">
                Preencha os detalhes da sua organização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-6">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name" className="text-lg">
                      Nome da Organização
                    </Label>
                    <Input
                      id="name"
                      placeholder="Digite o nome da organização"
                      className="p-3 text-lg"
                    />
                  </div>
                  {/* Add more form fields here */}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="px-6 py-3 text-lg">Salvar</Button>
            </CardFooter>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-r-lg bg-primary p-6 text-white">
            <Image
              src="/savepoint-logo-white.png"
              alt="Savepoint Logo"
              width={150}
              height={150}
              objectFit="contain"
            />
            <h2 className="mt-6 text-center text-xl font-semibold">
              Tela da organização, que vem em sequência
            </h2>
            <p className="mt-4 text-justify">
              Para uma experiência segura e completa, precisamos de algumas
              informações sobre sua organização. Isso nos ajudará a conectar sua
              instituição com as melhores oportunidades e garantir a segurança
              de todos os envolvidos.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
