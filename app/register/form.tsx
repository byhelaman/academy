"use client";
import { useEffect, useState } from "react";

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
import { InputPassword } from "../login/components/password";

const ERROR_MESSAGES = {
  REQUIRED: "Campo requerido",
  STRING_LENGTH: (min: number, max: number) =>
    `Debe tener entre ${min} y ${max} caracteres`,
  NUMERIC: "Solo se permiten números",
  LETTERS: "Solo se permiten letras y espacios",
  SELECT_OPTION: "Seleccione una opción válida",
  DNI_LENGTH: "El DNI debe tener 8 dígitos",
  EMAIL: "Correo electrónico inválido",
  PASSWORD_MISMATCH: "Las contraseñas no coinciden",
  DATE_RANGE: "Debe ser mayor de 18 años",
  PHONE_LENGTH: "Debe tener 9 dígitos",
};

const validateDate = (date: Date) => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  return date >= minDate;
};

const FormSchema = z
  .object({
    name: z
      .string()
      .min(2, ERROR_MESSAGES.STRING_LENGTH(2, 50))
      .max(50, ERROR_MESSAGES.STRING_LENGTH(2, 50))
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, ERROR_MESSAGES.LETTERS),
    lastname: z
      .string()
      .min(2, ERROR_MESSAGES.STRING_LENGTH(2, 50))
      .max(50, ERROR_MESSAGES.STRING_LENGTH(2, 50))
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, ERROR_MESSAGES.LETTERS),
    id: z
      .string()
      .length(8, ERROR_MESSAGES.DNI_LENGTH)
      .regex(/^\d+$/, ERROR_MESSAGES.NUMERIC),
    dob: z
      .date({ message: ERROR_MESSAGES.REQUIRED })
      .refine(validateDate, ERROR_MESSAGES.DATE_RANGE),
    relation: z.enum(["parent", "tutor"], {
      message: ERROR_MESSAGES.SELECT_OPTION,
    }),
    address: z.string().min(2, ERROR_MESSAGES.REQUIRED),
    job: z.string().min(2, ERROR_MESSAGES.REQUIRED),
    phone: z
      .string()
      .length(9, ERROR_MESSAGES.PHONE_LENGTH)
      .regex(/^\d+$/, ERROR_MESSAGES.NUMERIC),
    emergency_contact: z
      .string()
      .length(9, ERROR_MESSAGES.PHONE_LENGTH)
      .regex(/^\d+$/, ERROR_MESSAGES.NUMERIC),
    email: z.string().email(ERROR_MESSAGES.EMAIL),
    password: z.string().min(8, ERROR_MESSAGES.STRING_LENGTH(8, 50)),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    path: ["confirm_password"],
  });

const stepFields: Record<number, (keyof z.infer<typeof FormSchema>)[]> = {
  1: ["name", "lastname", "id", "dob", "relation"],
  2: ["address", "job", "phone", "emergency_contact"],
  3: ["email", "password", "confirm_password"],
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
    const fields = stepFields[step];
    const isValid = await form.trigger(fields);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    form.clearErrors(stepFields[step]);
    setStep((prev) => prev - 1);
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
                        <Input {...field} maxLength={8} />
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
                              toYear={new Date().getFullYear() - 18}
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
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="parent">Padre / Madre</SelectItem>
                          <SelectItem value="tutor">Tutor Legal</SelectItem>
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
                      <FormLabel>Ocupación / Profesión</FormLabel>
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
                      <FormLabel>Teléfono / WhatsApp</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={9} />
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
                        <Input {...field} maxLength={9} />
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
                        <InputPassword {...field} />
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
                        <InputPassword {...field} />
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
