/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getPreviousUrl, setPreviousUrl } from "@/lib/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome da organização deve ter pelo menos 2 caracteres.",
  }),
});

export default function OrganizacaoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const previousUrl = getPreviousUrl();
    console.log("User came from:", previousUrl);
    setPreviousUrl(pathname);
  }, [pathname]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create organization");
      }

      const data = await response.json();
      console.log("Organization created:", data.organization);

      const previousUrl = getPreviousUrl();
      console.log("Submitting form. User came from:", previousUrl);

      // Redirect to /onboard/info
      router.push("/onboarding/info");
    } catch (error) {
      console.error("Error creating organization:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsSubmitting(false);
    }
  }

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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">
                          Nome da Organização
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite o nome da organização"
                            className="p-3 text-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Add more form fields here */}
                  <CardFooter className="flex justify-end px-0">
                    <Button
                      type="submit"
                      className="px-6 py-3 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
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
