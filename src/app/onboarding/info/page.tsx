/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getPreviousUrl } from "@/lib/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  city: z.string().min(2, {
    message: "A cidade deve ter pelo menos 2 caracteres.",
  }),
});

export default function InfoPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [selectedQualities, setSelectedQualities] = useState<number[]>([]);

  useEffect(() => {
    const url = getPreviousUrl();
    const path = url?.split("/");
    const qualities = searchParams.getAll("qualities").map(Number);
    console.log("Retrieved qualities:", qualities);
    console.log("Previous URL:", url);
    console.log("Path:", path);
    setSelectedQualities(qualities);
    setPreviousUrl(path?.[2] ?? null);
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("Submitting form. User came from path:", previousUrl);

    if (previousUrl === "voluntario" || previousUrl === "organizacao") {
      try {
        // Create user
        const userResponse = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            city: values.city,
            role: previousUrl === "voluntario" ? 2 : 1,
            qualities: selectedQualities,
            email: "",
            state: "",
          }),
        });

        if (!userResponse.ok) {
          throw new Error("Failed to create user");
        }

        const userResult = await userResponse.json();
        console.log("User created:", userResult);

        // Create user organization
        if (previousUrl === "organizacao") {
          const organizationResponse = await fetch("/api/organization", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: values.name,
            }),
          });

          if (!organizationResponse.ok) {
            throw new Error("Failed to create organization");
          }

          const organizationResult = await organizationResponse.json();
          console.log("Organization created:", organizationResult);

          // Link user to organization
          const userOrgResponse = await fetch("/api/user-organization", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userResult.userId,
              organizationId: organizationResult.organization.organizationId,
            }),
          });

          if (!userOrgResponse.ok) {
            throw new Error("Failed to link user to organization");
          }

          console.log("User linked to organization");
        }

        // Use router.push for client-side navigation
        router.push("/dashboard");
      } catch (error) {
        console.error("Error in form submission:", error);
        // Handle error (e.g., show error message to user)
      }
    } else {
      console.error("Invalid previous URL");
      // Handle error (e.g., show error message to user)
    }
  }

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
                        <FormLabel className="text-lg">Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome completo"
                            className="p-3 text-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Cidade</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite sua cidade"
                            className="p-3 text-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <CardFooter className="flex justify-end px-0">
                    <Button type="submit" className="px-6 py-3 text-lg">
                      Próximo
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
