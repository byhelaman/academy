"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { InputPassword } from "./components/password";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Correo electrónico inválido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .max(50, "Contraseña inválida"),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("POST:", {
      description: <code>{JSON.stringify(data, null, 2)}</code>,
    });
    form.reset();

    if (data.email === "jhon@doe.com") {
      redirect("/admin");
    }

    redirect("/user");
  }

  return (
    <Form {...form}>
      <Card className="shadow-none">
        <CardHeader className="mb-2 border-b border-dashed gap-0 text-center">
          <CardTitle className="text-xl font-bold tracking-tight ">
            Bienvenido a Academy
          </CardTitle>
          <CardDescription>
            Matrícula de forma rápida y sencilla
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <span className="font-medium">Iniciar Sesión</span>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon@doe.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <InputPassword {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
            <div className="text-center text-sm">
              ¿No tiene una cuenta?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Regístrese
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
