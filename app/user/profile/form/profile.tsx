"use client";
import { useState } from "react";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { es, is } from "date-fns/locale";
import { format } from "date-fns";
import {
  AlertCircle,
  ArrowLeft,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InputPassword } from "@/app/login/components/password";

const FormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    lastname: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    id: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    relation: z
      .enum(["option1", "option2", ""], {
        message: "Campo obligatorio",
      })
      .refine((val) => val !== "", {
        message: "Debes seleccionar una opción",
      }),
    phone: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    email: z.string().email({
      message: "Correo electrónico inválido",
    }),
    emergency_contact: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    address: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    password: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    new_password: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    confirm_new_password: z.string().min(2, {
      message: "Campo obligatorio",
    }),
  })
  .refine(
    (data) => {
      return data.new_password === data.confirm_new_password;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirm_new_password"],
    }
  );

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      lastname: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("POST:", {
      description: <code>{JSON.stringify(data, null, 2)}</code>,
    });
    form.reset();

    // redirect("/user");
  }

  return (
    <Form {...form}>
      <Card className="shadow-none border-none p-0">
        <CardContent className="p-0 pb-6">
          <div className="mb-8">
            <span className="font-medium">Información Personal</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-4 items-center">
              <Avatar className="h-40 w-40">
                <AvatarImage
                  src="/placeholder.svg?height=128&width=128"
                  alt="María García"
                />
                <AvatarFallback className="text-2xl">MG</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" disabled={!isEditing}>
                Cambiar Foto
              </Button>
            </div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombres</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="read-only:bg-muted"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="read-only:bg-muted"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI / Documento de Identidad</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="read-only:bg-muted"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="relation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Usuario</FormLabel>
                      {/* <FormLabel>Relación con el Estudiante</FormLabel> */}
                      <FormControl>
                        <Input
                          {...field}
                          className="read-only:bg-muted"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono/WhatsApp</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={9} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergency_contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contacto de emergencia</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={9} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </div>
          <div className="mt-6 flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              disabled={!isEditing}
            >
              Guardar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
}

export function SecurityForm() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      lastname: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("POST:", {
      description: <code>{JSON.stringify(data, null, 2)}</code>,
    });
    form.reset();

    // redirect("/user");
  }

  return (
    <Form {...form}>
      <Card className="shadow-none border-none p-0">
        <CardContent className="p-0 pb-6">
          <div className="mb-8 flex items-center gap-4 justify-between">
            <span className="font-medium">Seguridad de la Cuenta</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña Actual</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva Contraseña</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Cambiar Contraseña</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
}
