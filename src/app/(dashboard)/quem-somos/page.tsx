import { Button } from "@/components/ui/button";

export default function QuemSomosPage() {
  return (
    <main className="flex h-[calc(100vh-5rem)] flex-col items-center justify-around">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-8xl font-bold">Quem Somos 👥</h1>
        <p className="text-2xl text-muted-foreground">Conheça Nossa Equipe</p>
      </div>
      <div>
        <Button>Saiba Mais</Button>
      </div>
    </main>
  );
}
