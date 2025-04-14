import { use, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  UseFormReturn,
  Path,
  useFormContext,
  Controller,
  useWatch,
} from "react-hook-form";
import {
  Check,
  CircleCheck,
  CircleCheckBig,
  CircleHelp,
  Info,
  SquareArrowOutUpRight,
  TriangleAlert,
} from "lucide-react";

import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EnrollmentFormMethods, EnrollmentFormType } from "./utlis";

import { InfoTooltip, InfoTooltipProps } from "../../components/tooltip";

interface StepThreeProps {
  form: EnrollmentFormMethods;
}

interface FieldConfig {
  name: Path<EnrollmentFormType>;
  label: React.ReactNode;
  condition?: boolean;
  tooltip?: InfoTooltipProps;
}

export default function StepThree({ form }: StepThreeProps) {
  const selectedLevel = form.watch("level");
  const selectedGrade = form.watch("grade");
  const selectedEnrollmentMode = form.watch("enrollmentMode");
  const selectedRelationship = form.watch("relationship");

  useEffect(() => {
    form.resetField("docs");
  }, [selectedLevel, selectedGrade, selectedEnrollmentMode, form]);

  // Muestra los inputs según las condiciones establecidas.
  // IMPORTANTE: Si se modifica alguna condición, también debe actualizarse el schema de validación.

  const studentFields: FieldConfig[] = [
    {
      name: "docs.dniStudent",
      label: "DNI / Documento de Identidad",
      condition: true,
    },
    {
      name: "docs.birthCertificate",
      label: "Partida de Nacimiento (Original)",
      condition:
        selectedLevel !== "secondary" &&
        (selectedEnrollmentMode === "newEnrollment" ||
          selectedEnrollmentMode === "transfer"),
    },
    {
      name: "docs.studentPhoto",
      label: "Foto tamaño carné del estudiante",
      condition:
        selectedEnrollmentMode === "newEnrollment" ||
        selectedEnrollmentMode === "transfer",
    },
    {
      name: "docs.vaccinationCard",
      label: "Carné de Vacunación (Actualizado)",
      condition:
        selectedEnrollmentMode !== "reEnrollment" &&
        selectedLevel !== "secondary",
    },
    {
      name: "docs.healthCertificate",
      label: "Certificado de Salud / Constancia Médica",
      condition:
        selectedEnrollmentMode !== "reEnrollment" &&
        selectedLevel === "preschool",
    },
    {
      name: "docs.primaryCertificates",
      label: "Certificados de estudios (Primaria)",
      condition:
        selectedEnrollmentMode !== "reEnrollment" &&
        selectedLevel === "secondary",
    },
    {
      name: "docs.lastGradeCertificate",
      label: "Certificado de estudios del último grado cursado",
      condition:
        selectedEnrollmentMode !== "reEnrollment" &&
        ((selectedLevel === "primary" && selectedGrade !== "grade1") ||
          selectedLevel === "secondary"),
    },
  ];

  const parentFields: FieldConfig[] = [
    {
      name: "docs.dniParent",
      label: "DNI / Documento de Identidad",
      condition: true,
    },
    {
      name: "docs.utilityBill",
      label: "Copia del recibo de Agua / Luz",
      condition:
        selectedEnrollmentMode === "newEnrollment" ||
        selectedEnrollmentMode === "transfer",
    },
    {
      name: "docs.enrollmentForm",
      label: (
        <span className="flex items-center gap-1">
          Ficha Única de matrícula &#40;FUM&#41;
          <InfoTooltip
            title="Ficha Única de Matrícula"
            description="Contiene los datos personales del estudiante y su familia, así como información sobre el colegio."
            className="w-[286px]"
          />
        </span>
      ),
      condition:
        selectedEnrollmentMode === "newEnrollment" ||
        selectedEnrollmentMode === "transfer",
    },
    {
      name: "docs.transferResolution",
      label: "Resolución de traslado (SIAGIE)",
      condition: selectedEnrollmentMode === "transfer",
    },
    {
      name: "docs.academicProgress",
      label: "Informe de progreso académico (Opcional)",
      condition: selectedEnrollmentMode === "transfer",
    },
    {
      name: "docs.debtCertificate",
      label: "Constancia de No Adeudo (Colegio anterior)",
      condition:
        (selectedEnrollmentMode === "transfer" ||
          selectedEnrollmentMode === "newEnrollment") &&
        ((selectedLevel === "primary" && selectedGrade !== "grade1") ||
          selectedLevel === "secondary"),
    },
    {
      name: "docs.internalRegulations",
      label: (
        <span className="flex items-center gap-1">
          Firma del reglamento interno y carta de compromiso
          <InfoTooltip
            title="Reglamento interno y Carta de compromiso"
            description="Documentos con reglas y acuerdos que deben seguir estudiantes y sus familias durante el año escolar."
          />
        </span>
      ),
      condition: true,
    },
  ];

  const renderField = (fieldConfig: FieldConfig) => {
    const value = useWatch({ name: fieldConfig.name });

    return (
      <FormField
        key={fieldConfig.name}
        control={form.control}
        name={fieldConfig.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              {fieldConfig.label}
              {fieldConfig.tooltip && <InfoTooltip {...fieldConfig.tooltip} />}
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                key={value?.name}
                className="pe-3 file:pe-3 file:me-3 file:border-0 file:border-e file:border-input file:h-full"
              />
            </FormControl>
            {value && (
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Check className="h-4 w-4 text-green-600" />
                {value.name}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="space-y-6">
      <Alert className="mb-6">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Requisitos de archivos</AlertTitle>
        <AlertDescription>
          Formatos permitidos: PDF, JPG, JPEG, PNG &#40;Tamaño máximo: 5MB&#41;
        </AlertDescription>
      </Alert>

      <Card className="shadow-none border-dashed">
        <CardHeader className="border-dashed border-b">
          <CardTitle>Documentos del Estudiante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {studentFields.map((field) => field.condition && renderField(field))}
        </CardContent>
      </Card>

      <Card className="shadow-none border-dashed">
        <CardHeader className="border-dashed border-b">
          <CardTitle>
            Documentos del{" "}
            {selectedRelationship === "tutor" ? "Tutor Legal" : "Padre / Madre"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {parentFields.map((field) => field.condition && renderField(field))}
        </CardContent>
      </Card>
    </div>
  );
}
