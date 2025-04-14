"user client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EnrollmentFormMethods } from "./utlis";
import { Check, CircleCheckBig } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

import {
  LEVEL_OPTIONS,
  SHIFT_OPTIONS,
  GRADE_OPTIONS,
  GRADE_LABELS,
  DOCUMENT_LABELS,
  ENROLLMENT_MODE_OPTIONS,
  RELATIONSHIP_OPTIONS,
} from "./constants";
import { es } from "date-fns/locale";

interface StepOneProps {
  form: EnrollmentFormMethods;
}

const SummaryItem = ({
  label,
  value,
  options,
  displayMap,
  sensitive,
}: {
  label: string;
  value: any;
  options?: Array<{ value: string; label: string }>;
  displayMap?: Record<string, string>;
  sensitive?: boolean;
}) => {
  let displayValue = value;

  if (options) {
    displayValue = options.find((opt) => opt.value === value)?.label;
  } else if (displayMap) {
    displayValue = displayMap[value];
  }

  if (!displayValue && typeof value === "string") {
    displayValue = value;
  }

  if (sensitive && typeof value === "string") {
    displayValue = `*****${value.slice(-4)}`;
  }

  return (
    <div className="flex gap-2">
      <dt className="text-sm text-muted-foreground">{label}:</dt>
      <dd className="text-sm text-foreground">
        {displayValue || "No especificado"}
      </dd>
    </div>
  );
};

export default function StepFour({ form }: StepOneProps) {
  const selectedRelationship = form.watch("relationship");
  const selectedEnrollmentMode = form.watch("enrollmentMode");

  return (
    <div className="space-y-6">
      <Alert className="mb-6">
        <CircleCheckBig className="h-4 w-4" />
        <AlertTitle>¡Todo listo para enviar!</AlertTitle>
        <AlertDescription>
          Revise que toda la información sea correcta antes de confirmar.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="shadow-none border-dashed">
          <CardHeader className="border-dashed border-b">
            <CardTitle>Resumen de la Matrícula</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-1">
              <SummaryItem
                label="Modalidad de Inscripción"
                value={form.getValues("enrollmentMode")}
                options={ENROLLMENT_MODE_OPTIONS}
              />
              <SummaryItem
                label="Nivel"
                value={form.getValues("level")}
                options={LEVEL_OPTIONS}
              />
              <SummaryItem
                label="Grado a Matricular"
                value={form.getValues("grade")}
                aria-label={form.getValues("grade")}
                displayMap={GRADE_LABELS}
              />
              <SummaryItem
                label="Turno"
                value={form.getValues("shift")}
                options={SHIFT_OPTIONS}
              />
              {selectedEnrollmentMode !== "reEnrollment" && (
                <SummaryItem
                  label="Sección"
                  value={"Pendiente de asignación"}
                />
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-none border-dashed">
          <CardHeader className="border-dashed border-b">
            <CardTitle>Información del Estudiante</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-1">
              <SummaryItem
                label="Nombres"
                value={`${form.getValues("name")}`}
                options={LEVEL_OPTIONS}
              />
              <SummaryItem
                label="Apellidos"
                value={`${form.getValues("lastname")}`}
                options={LEVEL_OPTIONS}
              />
              <SummaryItem
                label="DNI / Documento de Identidad"
                value={form.getValues("id")}
                options={LEVEL_OPTIONS}
              />
              <SummaryItem
                label="Fecha de Nacimiento"
                value={format(form.getValues("dob"), "PP", { locale: es })}
                options={LEVEL_OPTIONS}
              />
              <SummaryItem
                label="Género"
                value={`${form.getValues("gender")}`}
                options={LEVEL_OPTIONS}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none border-dashed">
        <CardHeader className="border-dashed border-b">
          <CardTitle>
            Información del{" "}
            {selectedRelationship === "tutor" ? "Tutor Legal" : "Padre / Madre"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-1">
            <SummaryItem label="Nombres y Apellidos" value="undefined" />
            <SummaryItem
              label="DNI / Documento de Identidad"
              value="undefined"
            />
            <SummaryItem
              label="Relación con el Estudiante"
              value={`${form.getValues("relationship")}`}
              options={RELATIONSHIP_OPTIONS}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-none border-dashed">
        <CardHeader className="border-dashed border-b">
          <CardTitle>Documentos Adjuntos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="space-y-2 text-sm">
            {Object.entries(form.getValues("docs")).map(
              ([key, file]) =>
                file && (
                  <li key={key} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="font-medium">
                      {key === "dniParent"
                        ? `DNI del ${
                            selectedRelationship === "tutor"
                              ? "Tutor Legal"
                              : "Padre/Madre"
                          }`
                        : DOCUMENT_LABELS[
                            key as keyof typeof DOCUMENT_LABELS
                          ] || key}
                    </span>
                    <span className="text-muted-foreground">{file.name}</span>
                  </li>
                )
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
