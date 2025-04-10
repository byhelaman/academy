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
import {
  AlertCircle,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  3: ["address", "job", "phone", "emergency_contact"],
};

const stepTitles: { [key: number]: string } = {
  1: "Selección de Nivel Educativo",
  2: "Información del Estudiante",
  3: "Documentos Requeridos",
  4: "Confirmación de Matrícula",
};

export function EnrollmentForm() {
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

    // if (currentFields) {
    //   const isValid = await form.trigger(currentFields);
    //   console.log(isValid);

    //   if (!isValid) return;
    // }

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
    // redirect("/register");
  }

  return (
    <Form {...form}>
      <Card className="shadow-none border-none p-0">
        <CardContent className="p-0">
          <div className={step != 3 ? "mb-8" : "mb-2"}>
            <span className="font-semibold">{stepTitles[step] || ""}</span>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <LevelSelector />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="relation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grado preferido</FormLabel>
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
                            <SelectItem value="option1">1er Grado</SelectItem>
                            <SelectItem value="option2">2do Grado</SelectItem>
                            <SelectItem value="option3">3er Grado</SelectItem>
                            <SelectItem value="option4">4to Grado</SelectItem>
                            <SelectItem value="option5">5to Grado</SelectItem>
                            <SelectItem value="option6">6to Grado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="relation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Turno preferido</FormLabel>
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
                            <SelectItem value="option1">
                              Mañana (07:30 - 12:30)
                            </SelectItem>
                            <SelectItem value="option2">
                              Tarde (12:45 - 18:30)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="relation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Procedencia educativa</FormLabel>
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
                          <SelectItem value="option1">Nuevo ingreso</SelectItem>
                          <SelectItem value="option2">
                            Traslado de otra institución
                          </SelectItem>
                          <SelectItem value="option3">Reingreso</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Motivo de elección de la institución
                        <span className="text-muted-foreground">
                          (Opcional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres del Estudiante</FormLabel>
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
                        <FormLabel>Apellidos del Estudiante</FormLabel>
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
                      <FormLabel>
                        DNI / Documento de Identidad del Estudiante
                      </FormLabel>
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
                              fromYear={2010}
                              toYear={2024}
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
                      <FormLabel>Genero</FormLabel>
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
                          <SelectItem value="option1">Masculino</SelectItem>
                          <SelectItem value="option2">Femenino</SelectItem>
                        </SelectContent>
                      </Select>
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
                        value={field.value == null ? "option1" : field.value}
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
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Alergias o Condiciones Médicas
                        <span className="text-muted-foreground">
                          (Opcional)
                        </span>
                      </FormLabel>
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
                <Alert className="mb-8">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Información Importante</AlertTitle>
                  <AlertDescription>
                    Los documentos deben estar en formato PDF o imagen (JPG,
                    PNG) y no deben exceder los 5MB.
                  </AlertDescription>
                </Alert>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        DNI o Partida de Nacimiento del Estudiante
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="file" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Constancia de traslado</FormLabel>
                      <FormControl>
                        <Input {...field} type="file" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fotografía reciente del estudiante</FormLabel>
                      <FormControl>
                        <Input {...field} type="file" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Libreta de notas del año anterior</FormLabel>
                      <FormControl>
                        <Input {...field} type="file" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificado médico</FormLabel>
                      <FormControl>
                        <Input {...field} type="file" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI del padre, madre o tutor legal</FormLabel>
                      <FormControl>
                        <Input {...field} type="file" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 4 && (
              <>
                <div className="flex flex-col gap-2">
                  <span>Información de Matrícula</span>
                  <span>Información del Estudiante </span>
                  <span> Información del Padre/Madre/Tutor</span>
                  <span>Documentos Requeridos</span>
                </div>
              </>
            )}
            <div
              className={`w-full flex ${
                step > 1 && step <= 4 ? "justify-between" : "justify-end"
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

              {step < 4 ? (
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

import { useId } from "react";
import { Brush, Eraser, Scissors, SwatchBook } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function LevelSelector() {
  const id = useId();

  const items = [
    { value: "1", label: "Inicial", Icon: SwatchBook },
    { value: "2", label: "Primaria", Icon: Brush },
    { value: "3", label: "Secundaria", Icon: Eraser },
  ];

  return (
    <RadioGroup className="grid-cols-2 md:grid-cols-3" defaultValue="2">
      {items.map((item) => (
        <div
          key={`${id}-${item.value}`}
          className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-col gap-4 rounded-md border p-4 shadow-xs outline-none"
        >
          <div className="flex justify-between gap-2">
            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className="order-1 after:absolute after:inset-0"
            />
            <item.Icon className="opacity-60" size={16} aria-hidden="true" />
          </div>
          <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
