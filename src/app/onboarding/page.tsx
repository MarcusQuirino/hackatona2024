import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, UserCircle2 } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-8">
            <CardHeader>
              <CardTitle className="mb-6 text-center text-3xl">
                Quem é você?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-8">
                <ProfileButton
                  title="Organização"
                  link="/onboarding/organizacao"
                  icon="organization"
                />
                <ProfileButton
                  title="Voluntário"
                  link="/onboarding/voluntario"
                  icon="volunteer"
                />
              </div>
            </CardContent>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-b-lg bg-primary p-8 text-white md:rounded-r-lg md:rounded-bl-none">
            <Image
              src="/savepoint-logo-white.png"
              alt="Savepoint Logo"
              width={200}
              height={200}
              objectFit="contain"
            />
            <p className="mt-6 text-base">
              <strong>Organização:</strong> Podem criar e publicar atividades
              relacionadas a desastres, definir as habilidades necessárias, o
              número de voluntários, gerenciar candidaturas, selecionar equipes
              e atualizar o status das quests na plataforma.
            </p>
            <p className="mt-4 text-base">
              <strong>Voluntário:</strong> Pode visualizar atividades
              relacionadas a desastres, candidatar-se para participar dessas
              atividades com base em suas habilidades e disponibilidade, e
              acompanhar seu histórico de participação e impacto através de
              métricas na plataforma.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface ProfileButtonProps {
  title: string;
  link: string;
  icon: "organization" | "volunteer";
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ title, link, icon }) => {
  const IconComponent = icon === "organization" ? Building2 : UserCircle2;

  return (
    <Link href={link} passHref className="w-full max-w-[160px]">
      <Button
        className="h-auto w-full flex-col items-center justify-center p-6 text-center"
        variant="outline"
      >
        <IconComponent className="mb-3 h-14 w-14" />
        <div className="w-full truncate text-base font-semibold">{title}</div>
      </Button>
    </Link>
  );
};
