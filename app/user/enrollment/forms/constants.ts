// src/app/enrollment/constants.ts
import { SwatchBook, Brush, Eraser } from "lucide-react";

export const LEVEL_OPTIONS = [
  { value: "preschool", label: "Inicial", icon: SwatchBook },
  { value: "primary", label: "Primaria", icon: Brush },
  { value: "secondary", label: "Secundaria", icon: Eraser },
];

export const SHIFT_OPTIONS = [
  { value: "morning", label: "Mañana (07:30 - 12:30)" },
  { value: "afternoon", label: "Tarde (13:00 - 18:30)" },
];

export const RELATIONSHIP_OPTIONS = [
  { value: "parent", label: "Padre / Madre" },
  { value: "tutor", label: "Tutor Legal" },
];

export const GRADE_OPTIONS = {
  preschool: [
    { value: "aula3", label: "Aula (3 años)" },
    { value: "aula4", label: "Aula (4 años)" },
    { value: "aula5", label: "Aula (5 años)" },
  ],
  primary: Array.from({ length: 6 }, (_, i) => ({
    value: `grade${i + 1}`,
    label: `${i + 1}° Grado`,
  })),
  secondary: Array.from({ length: 5 }, (_, i) => ({
    value: `grade${i + 1}`,
    label: `${i + 1}° Grado`,
  })),
};

export const ENROLLMENT_MODE_OPTIONS = [
  { value: "newEnrollment", label: "Nuevo ingreso" },
  { value: "transfer", label: "Traslado de otra institución" },
  { value: "reEnrollment", label: "Ratificación de matrícula" },
];

export const GRADE_LABELS = Object.values(GRADE_OPTIONS)
  .flat()
  .reduce((acc: Record<string, string>, curr) => {
    acc[curr.value] = curr.label;
    return acc;
  }, {});

export const DOCUMENT_LABELS: Record<string, string> = {
  dniStudent: "DNI del Estudiante",
  birthCertificate: "Partida de Nacimiento",
  studentPhoto: "Foto Carné del Estudiante",
  vaccinationCard: "Carné de Vacunación",
  healthCertificate: "Certificado de Salud",
  primaryCertificates: "Certificado de Primaria",
  lastGradeCertificate: "Certificado de Último Grado",
  dniParent: "DNI del Padre/Madre",
  utilityBill: "Recibo de Luz / Agua",
  enrollmentForm: "Ficha Única de Matrícula",
  transferResolution: "Resolución de Traslado",
  academicProgress: "Informe de Progreso Académico",
  debtCertificate: "Constancia de No Adeudo",
  internalRegulations: "Reglamento Interno Firmado",
};
