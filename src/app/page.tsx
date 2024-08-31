/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "@/components/ui/button";
import {
  GoogleOneTap,
  SignInButton,
  SignUpButton,
  SignedOut,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/getUserByClerkId";
import Image from "next/image";
import Savepointlogo from "../../public/Savepoint-logo.png";
import GoogleLogo from "../../public/google.png";

export default async function HomePage() {
  const { userId } = auth();

  if (userId !== null) {
    const user = await getUserByClerkId(userId);

    if (!user) {
      redirect("/onboarding");
    }
  }

  return (
    <main className="bg-onboard flex h-screen flex-col items-center justify-center bg-cover bg-center">
      <div className="flex h-3/5 w-1/2 rounded-3xl">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-l-3xl bg-primary px-12">
          <p className="mb-4 text-3xl text-white">Seu Poder de Mudar o Mundo</p>
          <p className="mb-4 text-justify text-lg text-white">
            Você já imaginou o impacto que uma única ação pode ter? Em momentos
            de crise, quando desastres abalam comunidades, sua solidariedade se
            torna uma força transformadora. Cada habilidade que você possui,
            cada hora que você pode doar, tem o poder de mudar vidas.
          </p>
          <p className="text-justify text-lg text-white">
            Nossa plataforma torna mais fácil do que nunca ser um herói do
            cotidiano. Seja limpando áreas afetadas, distribuindo suprimentos ou
            oferecendo apoio, suas ações criam ondas de esperança. Junte-se a
            nós hoje e descubra o herói que existe em você!
          </p>
        </div>
        <div className="flex h-full w-2/3 flex-col items-center justify-center rounded-r-3xl border px-12">
          <SignedOut>
            <Image
              src={Savepointlogo}
              alt="Descrição da Imagem"
              width={207}
              className="mb-20 pt-28"
            />
            <p className="mb-10 text-xl font-bold">Boas Vindas</p>
            <SignInButton>
              <Button className="bg-ghost rounded-full border-2 border-primary text-primary">
                <Image
                  src={GoogleLogo}
                  alt="Descrição da Imagem"
                  width={20}
                  className="mr-2"
                />
                Entrar com o Google
              </Button>
            </SignInButton>
          </SignedOut>
          <footer className="mt-auto flex flex-col items-center justify-end p-4">
            <p className="text-secondary">© 2024 Time Xanflis.</p>
            <p className="text-secondary">Todos os direitos reservados.</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
