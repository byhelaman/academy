import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "¿Cómo registro a más de un estudiante?",
    content:
      'Puede registrar a múltiples estudiantes desde su cuenta. Para hacerlo, vaya al panel principal y haga clic en el botón "Registrar Nuevo Estudiante". Complete el formulario para cada estudiante que desee matricular. Todos los estudiantes registrados aparecerán en la sección "Mis Estudiantes" de su panel de control.',
  },
  {
    id: "2",
    title: "¿Qué documentos necesito para la matrícula?",
    content: (
      <>
        <p className="text-sm text-muted-foreground">
          Los documentos requeridos para la matrícula son:
        </p>
        <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
          <li>DNI del estudiante</li>
          <li>DNI del padre/madre/tutor</li>
          <li>Partida de nacimiento</li>
          <li>Ficha de matrícula (si viene de otra institución)</li>
          <li>Libreta de notas del año anterior</li>
          <li>Foto reciente del estudiante</li>
        </ul>
        <p className="mt-2 text-sm text-muted-foreground">
          Todos los documentos deben estar en formato PDF o imagen (JPG, PNG) y
          no deben exceder los 5MB.
        </p>
      </>
    ),
  },
  {
    id: "3",
    title: "¿Cuánto tiempo toma el proceso de matrícula?",
    content:
      "El proceso de matrícula generalmente toma entre 3 a 5 días hábiles desde que se completa la solicitud y se suben todos los documentos requeridos. Una vez que la administración revisa y aprueba la documentación, recibirá una notificación con la confirmación de la matrícula y la asignación de sección.",
  },
  {
    id: "4",
    title: "¿Qué hago si un documento es rechazado?",
    content:
      'Si un documento es rechazado, recibirá una notificación indicando el motivo del rechazo. Deberá subir nuevamente el documento corregido en la sección "Documentos" de su panel de control. Asegúrese de que el documento sea legible, esté completo y cumpla con los requisitos especificados.',
  },
];

export default function Faq() {
  return (
    <div className="space-y-4 w-full py-8" id="faq">
      <h2 className="text-2xl font-semibold text-center tracking-tight">
        Todo lo que necesitas saber
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2"
        defaultValue="3"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
