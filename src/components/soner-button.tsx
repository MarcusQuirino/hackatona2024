"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

interface SonerButtonProps {
  onClick?: () => void;
}

export function SonerButton({ onClick }: SonerButtonProps) {
  const handleClick = async () => {
    toast("Cadastrado com sucesso", {
      description: `espere o contato da organização`,
    });
    onClick?.();
  };

  return (
    <Button
      size="lg"
      className="bg-blue-500 text-lg text-white hover:bg-blue-600"
      onClick={handleClick}
    >
      Voluntariar-se
    </Button>
  );
}
