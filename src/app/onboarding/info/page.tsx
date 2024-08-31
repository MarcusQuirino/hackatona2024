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

export default function InfoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <div className="flex">
          <div className="flex-1 p-6">
            <CardHeader>
              <CardTitle className="text-2xl">Informações Pessoais</CardTitle>
              <CardDescription className="text-lg">
                Preencha seus dados pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-6">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name" className="text-lg">
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      placeholder="Digite seu nome completo"
                      className="p-3 text-lg"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="city" className="text-lg">
                      Cidade
                    </Label>
                    <Input
                      id="city"
                      placeholder="Digite sua cidade"
                      className="p-3 text-lg"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="px-6 py-3 text-lg">Próximo</Button>
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
              Informações Pessoais
            </h2>
            <p className="mt-4 text-justify">
              Para uma experiência segura e completa, precisamos de algumas
              informações. Isso nos ajudará a conectar você com as oportunidades
              de voluntariado mais adequadas e garantir a segurança de todos os
              envolvidos.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
