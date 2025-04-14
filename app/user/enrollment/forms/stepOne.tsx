import { useEffect, useId, useMemo } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Brush, CircleHelp, Eraser, SwatchBook } from "lucide-react";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EnrollmentFormMethods } from "./utlis";

// Tipos y constantes reutilizables
import {
  LEVEL_OPTIONS,
  SHIFT_OPTIONS,
  GRADE_OPTIONS,
  ENROLLMENT_MODE_OPTIONS,
} from "./constants";

interface StepOneProps {
  form: EnrollmentFormMethods;
}

export default function StepOne({ form }: StepOneProps) {
  const selectedLevel = form.watch("level");
  const selectedGrade = form.watch("grade");
  const selectedEnrollmentMode = form.watch("enrollmentMode");

  // Resetear turno si se selecciona inicial/primaria
  useEffect(() => {
    if (selectedLevel === "preschool" || selectedLevel === "primary") {
      const currentShift = form.getValues("shift");
      if (currentShift === "afternoon") {
        form.setValue("shift", "");
      }
    }
  }, [selectedLevel, form]);

  useEffect(() => {
    const currentEnrollmentMode = form.getValues("enrollmentMode");

    if (selectedGrade === "aula3") {
      // Forzar 'newEnrollment' si el grado es aula3
      if (currentEnrollmentMode !== "newEnrollment") {
        form.setValue("enrollmentMode", "newEnrollment");
      }
    }
  }, [selectedGrade, form]);

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="level"
        render={({ field }) => <LevelSelector field={field} />}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <GradeSelect form={form} selectedLevel={selectedLevel} />
        <FormField
          control={form.control}
          name="shift"
          render={({ field }) => {
            // Filtrar opciones de turno
            const filteredShifts = ["preschool", "primary"].includes(
              selectedLevel
            )
              ? SHIFT_OPTIONS.filter((opt) => opt.value === "morning")
              : SHIFT_OPTIONS;

            return (
              <SelectField
                label="Turno preferido"
                options={filteredShifts}
                field={field}
              />
            );
          }}
        />
      </div>

      <FormField
        control={form.control}
        name="enrollmentMode"
        render={({ field }) => {
          // Paso 2: Filtrar opciones según el grado
          const filteredOptions =
            selectedGrade === "aula3"
              ? ENROLLMENT_MODE_OPTIONS.filter(
                  (opt) => opt.value === "newEnrollment"
                )
              : ENROLLMENT_MODE_OPTIONS;

          return (
            <SelectField
              label="Modalidad de Inscripción"
              options={filteredOptions}
              field={field}
            />
          );
        }}
      />

      <FormField
        control={form.control}
        name="institutionChoiceReason"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="gap-1">
              Motivo de elección (Opcional)
              <InfoTooltip
                title="Motivo de elección"
                description="Ayúdanos a mejorar la experiencia educativa."
              />
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

const SelectField = ({
  label,
  options,
  field,
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  field: ControllerRenderProps<any>;
}) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <Select onValueChange={field.onChange} value={field.value}>
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccione" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <FormMessage />
  </FormItem>
);

interface GradeSelectProps {
  form: EnrollmentFormMethods;
  selectedLevel: "preschool" | "primary" | "secondary";
}

const GradeSelect = ({ form, selectedLevel }: GradeSelectProps) => {
  useEffect(() => {
    const currentGrade = form.getValues("grade");
    const validGrades = GRADE_OPTIONS[selectedLevel].map((opt) => opt.value);

    if (selectedLevel && currentGrade && !validGrades.includes(currentGrade)) {
      form.setValue("grade", "");
    }
  }, [selectedLevel, form]);

  return (
    <FormField
      control={form.control}
      name="grade"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Grado a Matricular</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            key={selectedLevel}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {GRADE_OPTIONS[selectedLevel]?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Componente para selección de nivel con tipos adecuados
const LevelSelector = ({ field }: { field: ControllerRenderProps<any> }) => {
  const id = useId();

  return (
    <RadioGroup
      onValueChange={field.onChange}
      value={field.value}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      {LEVEL_OPTIONS.map((item) => (
        <div
          key={`${id}-${item.value}`}
          className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-col gap-4 rounded-md border p-4 shadow-xs outline-none"
        >
          <div className="flex justify-between gap-2">
            <RadioGroupItem
              id={`${id}-${item.value}`}
              value={item.value}
              className="order-1 after:absolute after:inset-0"
              aria-label={`Seleccionar nivel ${item.label}`}
            />
            <item.icon className="opacity-60" size={16} aria-hidden="true" />
          </div>
          <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface InfoTooltipProps {
  title?: string;
  description?: any;
}

function InfoTooltip({ title, description }: InfoTooltipProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="!p-0.5 !h-fit"
          >
            <CircleHelp size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="py-3 w-fit max-w-[320px]">
          <div className="space-y-1">
            <p className="text-[13px] font-medium">{title}</p>
            <p className="text-muted-foreground text-xs">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
