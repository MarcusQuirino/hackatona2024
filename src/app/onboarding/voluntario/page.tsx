"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getPreviousUrl, setPreviousUrl } from "@/lib/navigation";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Qualities } from "@/enums/qualities.enum";

const possibleTags: Record<number, string> = {
  [Qualities.Desenvolvedor]: "Desenvolvedor",
  [Qualities.PilotoBarco]: "Piloto de Barco",
  [Qualities.PilotoCarro]: "Piloto de Carro",
  [Qualities.PilotoMoto]: "Piloto de Moto",
  [Qualities.Medico]: "Médico",
  [Qualities.Enfermeiro]: "Enfermeiro",
  [Qualities.Bombeiro]: "Bombeiro",
  [Qualities.Policial]: "Policial",
  [Qualities.Professor]: "Professor",
  [Qualities.Engenheiro]: "Engenheiro",
  [Qualities.Eletricista]: "Eletricista",
  [Qualities.Encanador]: "Encanador",
  [Qualities.Pintor]: "Pintor",
  [Qualities.Pedreiro]: "Pedreiro",
  [Qualities.Voluntario]: "Voluntário",
  [Qualities.Logistico]: "Logístico",
};

export default function VoluntarioPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const previousUrl = getPreviousUrl();
    console.log("User came from:", previousUrl);
    setPreviousUrl(pathname);
  }, [pathname]);

  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const toggleTag = (tag: number) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handleConcluir = () => {
    const queryParams = new URLSearchParams();
    selectedTags.forEach((tag) =>
      queryParams.append("qualities", tag.toString()),
    );
    console.log(
      "Selected qualities added to query params:",
      queryParams.toString(),
    );
    router.push(`/onboarding/info?${queryParams.toString()}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="relative w-full max-w-3xl">
        <div className="absolute right-4 top-4">
          <Image
            src="/savepoint-logo.png"
            alt="Savepoint Logo"
            width={200}
            height={50}
            className="mb-4"
          />
        </div>
        <CardHeader>
          <h1 className="mb-6 text-left text-3xl font-bold text-gray-800">
            Habilidades e Conhecimentos
          </h1>
          <p className="mb-6 text-left text-sm text-gray-600">
            Selecione as habilidades e conhecimentos que possui
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-start gap-2">
            {Object.entries(possibleTags).map(([key, value]) => (
              <button
                key={key}
                onClick={() => toggleTag(Number(key))}
                className={`rounded-full border border-primary px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
                  selectedTags.includes(Number(key))
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleConcluir}>Concluir</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
