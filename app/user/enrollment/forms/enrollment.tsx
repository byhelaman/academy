"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";

import { FormSchema, EnrollmentFormType } from "./utlis";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const stepFields: Record<number, (keyof EnrollmentFormType)[]> = {
  1: ["level", "grade", "shift", "enrollmentMode"],
  2: ["name", "lastname", "id", "dob", "gender", "relationship"],
  3: ["docs"],
};

const stepTitles: Record<number, string> = {
  1: "Selección de Nivel Educativo",
  2: "Información del Estudiante",
  3: "Documentos Requeridos",
  4: "Confirmación de Matrícula",
};

export function EnrollmentForm() {
  const [step, setStep] = useState(1);

  const form = useForm<EnrollmentFormType>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      lastname: "",
      level: "primary",
      id: "",
      institutionChoiceReason: "",
      medicalConditions: "",
      docs: {
        dniStudent: undefined,
        birthCertificate: undefined,
        studentPhoto: undefined,
        vaccinationCard: undefined,
        healthCertificate: undefined,
        primaryCertificates: undefined,
        lastGradeCertificate: undefined,
        dniParent: undefined,
        utilityBill: undefined,
        enrollmentForm: undefined,
        transferResolution: undefined,
        academicProgress: undefined,
        debtCertificate: undefined,
        internalRegulations: undefined,
      },
    },
  });

  console.log("Errores actuales:", form.formState.errors);

  const nextStep = async () => {
    const fields = stepFields[step];
    const isValid = await form.trigger(fields);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    form.clearErrors(stepFields[step]);
    form.resetField("docs");
    setStep((prev) => prev - 1);
  };

  const onSubmit = (data: EnrollmentFormType) => {
    const cleanedData = {
      ...data,
      docs: Object.fromEntries(
        Object.entries(data.docs).filter(([_, value]) => value !== null)
      ),
    };

    toast("POST:", {
      description: <code>{JSON.stringify(cleanedData, null, 2)}</code>,
    });

    // form.reset();
    form.resetField("docs");
    setStep(1);
  };

  return (
    <Form {...form}>
      <Card className="shadow-none border-none p-0">
        <CardContent className="p-0">
          <div className={step !== 3 && step !== 4 ? "mb-8" : "mb-2"}>
            <span className="font-semibold">{stepTitles[step]}</span>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && <StepOne form={form} />}
            {step === 2 && <StepTwo form={form} />}
            {step === 3 && <StepThree form={form} />}
            {step === 4 && <StepFour form={form} />}

            <div className="w-full flex justify-between">
              {step > 2 ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Anterior</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Está seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Si retrocede ahora, se perderán los archivos que ha
                        subido.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={prevStep}>
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button
                  variant="outline"
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                >
                  Anterior
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    nextStep();
                  }}
                >
                  Siguiente
                </Button>
              ) : (
                <Button type="submit">Confirmar Matrícula</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
