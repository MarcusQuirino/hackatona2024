"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { possibleTags } from "@/app/onboarding/voluntario/page";
import { getPreviousUrl } from "@/lib/navigation";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Urgency } from "@/enums/urgency.enum";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/getUserByClerkId";

// Definição dos tipos para o formulário
interface FormData {
  name: string;
  priority: string;
  city: string;
  state: string;
  description: string;
  habilidades: number[];
  voluntarios: number;
}

export const priorities: Record<number, string> = {
  [Urgency.Urgente]: "Urgente",
  [Urgency.Alto]: "Alta",
  [Urgency.Moderado]: "Moderado",
  [Urgency.Baixo]: "Baixa",
};
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
const states = ["NY", "CA", "IL", "TX", "AZ"];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome da organização deve ter pelo menos 2 caracteres.",
  }),
});

const QuestForm: React.FC = () => {



  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<FormData>({ defaultValues: { habilidades: [] } });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();
      console.log("Ação criada:", data);

      router.push("/quests");
    } catch (error) {
      console.error("Error creating organization:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsSubmitting(false);
    }
  }

  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const toggleTag = (tag: number) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];
  
      form.setValue("habilidades", newTags);
  
      return newTags;
    });
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] items-center justify-center bg-gray-100">
      <Tabs
        defaultValue="basic"
        className="h-full w-2/5 items-center justify-center pt-10"
      >
        <TabsList className="grid w-2/3 grid-cols-3">
          <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
          <TabsTrigger value="additional">Adicionais</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="h-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Criar Nova Ação</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Nome é obrigatório" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Ação</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priority"
                      rules={{ required: "Prioridade é obrigatória" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prioridade</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Prioridade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(priorities).map(([key, value]) => (
                                <SelectItem
                                  key={key}
                                  value={value.toLowerCase()}
                                >
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      rules={{ required: "Cidade é obrigatório" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Cidade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      rules={{ required: "Estado é obrigatório" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Estado" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    rules={{ required: "Descrição é obrigatório" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descrição"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="additional" className="h-full">
          <Card className="w-full">
            <CardHeader>
              <CardDescription className="text-lg font-bold">
                Habilidades & Conhecimentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="habilidades"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CardContent>
                            <div className="flex flex-wrap justify-start gap-2">
                              {Object.entries(possibleTags).map(
                                ([key, value]) => (
                                  <button
                                    key={key}
                                    type="button"
                                    onClick={() => toggleTag(Number(key))}
                                    className={`rounded-full border border-primary px-3 py-1 text-sm font-semibold transition-colors duration-200 ${
                                      selectedTags.includes(Number(key))
                                        ? "bg-primary text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                  >
                                    {value}
                                  </button>
                                )
                              )}
                            </div>
                          </CardContent>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <CardDescription className="text-lg font-bold">
                    Quantidade de Voluntários
                  </CardDescription>

                  <FormField
                    control={form.control}
                    name="voluntarios"
                    rules={{ required: "Volunteers count is required", min: 0 }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CardContent>
                            <div className="flex flex-wrap justify-start gap-2">
                              <Input
                                type="number"
                                min={0}
                                placeholder="Quantidade de voluntários"
                                {...field}
                              />
                            </div>
                          </CardContent>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="rounded-full" disabled={isSubmitting}
                    >
                      {isSubmitting ? "Salvando..." : "Salvar"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestForm;
