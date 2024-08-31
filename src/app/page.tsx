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
      <div className="flex max-sm:flex-col 2xl:h-3/5 2xl:w-1/2 md:h-1/2 md:w-1/3 rounded-3xl max-sm:h-2/3 items-center">
        <div className="flex max-sm:h-2/3 h-full max-sm:w-[90%] w-2/3 flex-col items-center justify-center max-sm:rounded-t-3xl bg-primary px-12">
          <p className="mb-4 2xl:text-3xl text-white md:text-md">
            Seu Poder de Mudar o Mundo
          </p>
          <p className="lg:mb-4 text-justify 2xl:text-lg text-white max-sm:text-sm">
            Você já imaginou o impacto que uma única ação pode ter? Em momentos
            de crise, quando desastres abalam comunidades, sua solidariedade se
            torna uma força transformadora. Cada habilidade que você possui,
            cada hora que você pode doar, tem o poder de mudar vidas.
          </p>
          <p className="text-justify 2xl:text-lg max-sm:text-sm text-white">
            Nossa plataforma torna mais fácil do que nunca ser um herói do
            cotidiano. Seja limpando áreas afetadas, distribuindo suprimentos ou
            oferecendo apoio, suas ações criam ondas de esperança. Junte-se a
            nós hoje e descubra o herói que existe em você!
          </p>
        </div>
        <div className="flex max-sm:h-1/2 h-full max-sm:w-[90%] w-2/3 flex-col items-center justify-center max-sm:rounded-b-3xl border px-12">
          <SignedOut>
            <Image
              src={Savepointlogo}
              alt="Descrição da Imagem"
              width={207}
              className="md:mb-20 md:pt-28 max-sm:mb-5 max-sm:pt-5"
            />
            <p className="mb-10 max-sm:mb-5 text-xl font-bold">Boas Vindas</p>
            <SignInButton>
              <Button className="bg-ghost rounded-full border-2 border-primary text-primary hover:text-white">
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

