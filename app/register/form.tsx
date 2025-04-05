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
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

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
    dob: z.date({
      required_error: "Campo obligatorio",
    }),
    relation: z
      .enum(["option1", "option2", ""], {
        message: "Campo obligatorio",
      })
      .refine((val) => val !== "", {
        message: "Debes seleccionar una opción",
      }),
    address: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    job: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    phone: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    emergency_contact: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    email: z.string().email({
      message: "Correo electrónico inválido",
    }),
    password: z.string().min(2, {
      message: "Campo obligatorio",
    }),
    confirm_password: z.string().min(2, {
      message: "Campo obligatorio",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirm_password"],
    }
  );

const stepFields: Record<number, (keyof z.infer<typeof FormSchema>)[]> = {
  1: ["name", "lastname", "id", "dob", "relation"],
  2: ["address", "job", "phone", "emergency_contact"],
};

const stepTitles: { [key: number]: string } = {
  1: "Información Personal",
  2: "Información de Contacto",
  3: "Información de Acceso",
};

export function RegisterForm() {
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    // reValidateMode: "onChange",
    defaultValues: {
      name: "",
      lastname: "",
      id: "",
      dob: undefined,
      relation: undefined,
      address: "",
      job: "",
      phone: "",
      emergency_contact: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const nextStep = async () => {
    const currentFields = stepFields[step];
    if (!currentFields) return;

    if (currentFields) {
      const isValid = await form.trigger(currentFields);
      console.log(isValid);

      if (!isValid) return;
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("POST:", {
      description: <code>{JSON.stringify(data, null, 2)}</code>,
    });
    form.reset();
    setStep(1);
    redirect("/register");
  }

  return (
    <Form {...form}>
      <Card className="shadow-none">
        <CardHeader className="mb-2 border-b border-dashed gap-0 text-center">
          <CardTitle className="text-xl font-bold tracking-tight">
            Crea tu cuenta
          </CardTitle>
          <CardDescription>
            Regístrate y comienza tu experiencia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <span className="font-medium">{stepTitles[step] || ""}</span>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI / Documento de Identidad</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de Nacimiento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PP", { locale: es })
                              ) : (
                                <span>Seleccione una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <>
                            <Calendar
                              captionLayout="dropdown-buttons"
                              fromYear={1980}
                              toYear={2010}
                              mode="single"
                              selected={field.value ?? null}
                              onSelect={field.onChange}
                              initialFocus
                            ></Calendar>
                          </>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="relation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relación con el Estudiante</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="option1">Padre/Madre</SelectItem>
                          <SelectItem value="option2">Tutor Legal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ocupación/profesión</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono/WhatsApp</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Contraseña</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <div
              className={`w-full flex ${
                step > 1 && step <= 3 ? "justify-between" : "justify-end"
              }`}
            >
              {step > 1 ? (
                <Button
                  variant="outline"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    prevStep();
                  }}
                >
                  <ChevronLeft />
                  Anterior
                </Button>
              ) : null}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    nextStep();
                  }}
                >
                  Siguiente
                  <ChevronRight />
                </Button>
              ) : (
                <Button type="submit">Registrarse</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
