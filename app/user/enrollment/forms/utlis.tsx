import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

// Mensajes estandarizados
const ERROR_MESSAGES = {
  REQUIRED: "Este campo es obligatorio",
  INVALID_TYPE: "Tipo de archivo no válido",
  MAX_SIZE: "El tamaño máximo permitido es 5MB",
  DATE_RANGE: "La edad debe estar entre 3 y 18 años",
  STRING_LENGTH: (min: number, max: number) =>
    `Debe tener entre ${min} y ${max} caracteres`,
  NUMERIC: "Solo se permiten números",
  LETTERS: "Solo se permiten letras y espacios",
  SELECT_OPTION: "Seleccione una opción válida",
  DNI_LENGTH: "El DNI debe tener 8 dígitos",
  DOCUMENT_REQUIRED: "Documento requerido",
};

const validateFile = ({ required = true }) => {
  return z
    .instanceof(File, {
      message: required ? ERROR_MESSAGES.DOCUMENT_REQUIRED : "",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, ERROR_MESSAGES.MAX_SIZE)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      ERROR_MESSAGES.INVALID_TYPE
    );
};

const validateDate = (date: Date) => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() - 3,
    today.getMonth(),
    today.getDate()
  );
  return date >= minDate && date <= maxDate;
};

const FormSchemaDocs = z.object({
  // Archivos solicitados para el proceso de inscripción.
  // La obligatoriedad de cada archivo puede variar según el modo de inscripción y el nivel educativo.
  // Los campos requeridos siempre deben estar presentes; los opcionales se validan solo si se cargan.

  dniStudent: validateFile({ required: true }),
  birthCertificate: validateFile({ required: false }).optional(),
  studentPhoto: validateFile({ required: false }).optional(),
  vaccinationCard: validateFile({ required: false }).optional(),
  healthCertificate: validateFile({ required: false }).optional(),
  primaryCertificates: validateFile({ required: false }).optional(),
  lastGradeCertificate: validateFile({ required: false }).optional(),
  dniParent: validateFile({ required: true }),
  utilityBill: validateFile({ required: false }).optional(),
  enrollmentForm: validateFile({ required: false }).optional(),
  transferResolution: validateFile({ required: false }).optional(),
  academicProgress: validateFile({ required: false }).optional(),
  debtCertificate: validateFile({ required: false }).optional(),
  internalRegulations: validateFile({ required: true }),
});

export const FormSchema = z
  .object({
    // Paso 1 - Información académica
    level: z.enum(["preschool", "primary", "secondary"], {
      required_error: ERROR_MESSAGES.SELECT_OPTION,
    }),
    grade: z.enum(
      [
        "aula3",
        "aula4",
        "aula5",
        "grade1",
        "grade2",
        "grade3",
        "grade4",
        "grade5",
        "grade6",
      ],
      {
        required_error: ERROR_MESSAGES.SELECT_OPTION,
        message: ERROR_MESSAGES.SELECT_OPTION,
      }
    ),
    shift: z.enum(["morning", "afternoon"], {
      required_error: ERROR_MESSAGES.SELECT_OPTION,
    }),
    enrollmentMode: z.enum(["newEnrollment", "transfer", "reEnrollment"], {
      required_error: ERROR_MESSAGES.SELECT_OPTION,
    }),
    institutionChoiceReason: z
      .string()
      .max(200, ERROR_MESSAGES.STRING_LENGTH(1, 200)),

    // Paso 2 - Información del estudiante
    name: z
      .string()
      .min(2, ERROR_MESSAGES.REQUIRED)
      .max(50, ERROR_MESSAGES.REQUIRED)
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, ERROR_MESSAGES.LETTERS),
    lastname: z
      .string()
      .min(2, ERROR_MESSAGES.REQUIRED)
      .max(50, ERROR_MESSAGES.REQUIRED)
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, ERROR_MESSAGES.LETTERS),
    id: z
      .string()
      .length(8, ERROR_MESSAGES.DNI_LENGTH)
      .regex(/^\d+$/, ERROR_MESSAGES.NUMERIC),
    dob: z
      .date({ message: ERROR_MESSAGES.REQUIRED })
      .refine(validateDate, ERROR_MESSAGES.DATE_RANGE),
    gender: z.enum(["Masculino", "Femenino"], {
      required_error: ERROR_MESSAGES.SELECT_OPTION,
    }),
    relationship: z.enum(["parent", "tutor"], {
      required_error: ERROR_MESSAGES.SELECT_OPTION,
    }),
    medicalConditions: z
      .string()
      .max(500, ERROR_MESSAGES.STRING_LENGTH(1, 500)),

    // Paso 3 - Documentación
    docs: FormSchemaDocs,
  })
  .superRefine((data, ctx) => {
    const { level, grade, enrollmentMode, docs } = data;

    const addValidation = (
      path: string[],
      message: string = ERROR_MESSAGES.DOCUMENT_REQUIRED
    ) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
        path: ["docs", ...path],
      });
    };

    // Validaciones condicionales
    if (
      level !== "secondary" &&
      (enrollmentMode === "newEnrollment" || enrollmentMode === "transfer")
    ) {
      if (!docs.birthCertificate) addValidation(["birthCertificate"]);
      // if (!docs.studentPhoto) addValidation(["studentPhoto"]);
    }

    if (enrollmentMode === "newEnrollment" || enrollmentMode === "transfer") {
      if (!docs.studentPhoto) addValidation(["studentPhoto"]);
    }

    if (enrollmentMode !== "reEnrollment" && level !== "secondary") {
      if (!docs.vaccinationCard) addValidation(["vaccinationCard"]);
    }

    if (
      level === "preschool" &&
      enrollmentMode !== "reEnrollment" &&
      !docs.healthCertificate
    )
      addValidation(["healthCertificate"]);

    if (
      enrollmentMode !== "reEnrollment" &&
      level === "secondary" &&
      !docs.primaryCertificates
    ) {
      addValidation(["primaryCertificates"]);
    }

    if (
      enrollmentMode !== "reEnrollment" &&
      ((level === "primary" && grade !== "grade1") || level === "secondary") &&
      !docs.lastGradeCertificate
    ) {
      addValidation(["lastGradeCertificate"]);
    }

    if (enrollmentMode !== "reEnrollment") {
      if (!docs.enrollmentForm) addValidation(["enrollmentForm"]);
      if (!docs.utilityBill) addValidation(["utilityBill"]);
    }

    if (enrollmentMode === "transfer" && !docs.transferResolution) {
      addValidation(["transferResolution"]);
    }

    if (
      (enrollmentMode === "transfer" || enrollmentMode === "newEnrollment") &&
      ((level === "primary" && grade !== "grade1") || level === "secondary") &&
      !docs.debtCertificate
    ) {
      addValidation(["debtCertificate"]);
    }

    if (!docs.internalRegulations) addValidation(["internalRegulations"]);
  });

export type EnrollmentFormType = z.infer<typeof FormSchema>;
export type EnrollmentFormMethods = UseFormReturn<EnrollmentFormType>;
