"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const possibleTags = {
  primeiros_socorros: "Primeiros Socorros",
  resgate_aquatico: "Resgate Aquático",
  combate_incendios: "Combate a Incêndios",
  operacao_maquinario_pesado: "Operação de Maquinário Pesado",
  logistica_distribuicao: "Logística e Distribuição",
  gerenciamento_suprimentos: "Gerenciamento de Suprimentos",
  atendimento_psicologico: "Atendimento Psicológico",
  assistencia_medica: "Assistência Médica",
  enfermagem: "Enfermagem",
  comunicacao_crise: "Comunicação de Crise",
  traducao_interpretacao: "Tradução e Interpretação",
  coordenacao_equipes: "Coordenação de Equipes",
  avaliacao_estrutural: "Avaliação Estrutural",
  purificacao_agua: "Purificação de Água",
  construcao_civil: "Construção Civil",
  operacao_drones: "Operação de Drones",
  analise_dados_geograficos: "Análise de Dados Geográficos (GIS)",
  cuidados_animais: "Cuidados com Animais",
  agricultura_manejo_solo: "Agricultura e Manejo do Solo",
  eletricidade_reparos: "Eletricidade e Reparos Elétricos",
  encanamento_sistemas_hidraulicos: "Encanamento e Sistemas Hidráulicos",
  cozinha_larga_escala: "Cozinha em Larga Escala",
  telecomunicacoes_emergencia: "Telecomunicações de Emergência",
  operacao_equipamentos_radio: "Operação de Equipamentos de Rádio",
  direcao_veiculos_pesados: "Direção de Veículos Pesados",
  navegacao_orientacao: "Navegação e Orientação",
  educacao_treinamento: "Educação e Treinamento",
  limpeza_ambiental: "Limpeza Ambiental",
  reciclagem_gestao_residuos: "Reciclagem e Gestão de Resíduos",
  costura_reparos_vestuario: "Costura e Reparos de Vestuário",
  carpintaria: "Carpintaria",
  servicos_juridicos: "Serviços Jurídicos",
  contabilidade_gestao_financeira: "Contabilidade e Gestão Financeira",
  fotografia_documentacao: "Fotografia e Documentação",
  programacao_desenvolvimento_software:
    "Programação e Desenvolvimento de Software",
  gestao_midias_sociais: "Gestão de Mídias Sociais",
  aconselhamento_espiritual: "Aconselhamento Espiritual",
  cuidados_geriatricos: "Cuidados Geriátricos",
  cuidados_pediatricos: "Cuidados Pediátricos",
  seguranca_vigilancia: "Segurança e Vigilância",
};

export default function OnboardingPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
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
            Select Your Skills
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
                onClick={() => toggleTag(key)}
                className={`rounded-full border border-primary px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
                  selectedTags.includes(key)
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
          <Button>Concluir</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
