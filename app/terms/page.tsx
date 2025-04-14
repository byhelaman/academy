"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChevronLeft, Eclipse } from "lucide-react";

const data = {
  terms: [
    {
      title: "Introducción",
      content:
        "Bienvenido al Sistema de Matrícula en Línea de nuestra Institución Educativa. Estos Términos y Condiciones regulan el uso de nuestra plataforma para el registro y matrícula de estudiantes. Al acceder y utilizar nuestro servicio, usted acepta estar sujeto a estos términos. Si no está de acuerdo con alguno de ellos, no podrá utilizar el sistema.",
    },
    {
      title: "Uso del Servicio",
      content:
        "El servicio de matrícula en línea está disponible exclusivamente para Padres/Tutores que cumplan con los requisitos establecidos por la Institución. Al utilizar esta plataforma, usted declara y garantiza que posee la capacidad legal para completar el proceso de matrícula conforme a las normativas vigentes en el Perú, incluyendo el Código de Protección y Defensa del Consumidor.",
    },
    {
      title: "Cuentas de Usuario",
      content:
        "Para acceder al sistema de matrícula, los Padres/Tutores deben crear una cuenta proporcionando información precisa y verídica. Es responsabilidad del usuario mantener actualizada su información. El incumplimiento de esta obligación podría resultar en la suspensión o eliminación de la cuenta, de acuerdo con lo establecido en la Ley de Gobierno Digital.",
    },
    {
      title: "Propiedad Intelectual",
      content:
        "El sistema de matrícula y todo su contenido, incluidas las características, el diseño y las funcionalidades, son propiedad exclusiva de la Institución Educativa. Está protegido por derechos de autor, marcas registradas y otras leyes de propiedad intelectual.",
    },
    {
      title: "Enlaces a Otros Sitios Web",
      content:
        "La plataforma puede contener enlaces a sitios web de terceros que no están bajo nuestro control. No somos responsables de los contenidos, políticas de privacidad o prácticas de dichos sitios web externos.",
    },
    {
      title: "Terminación",
      content:
        "Podemos suspender o cancelar el acceso a su cuenta en cualquier momento, sin previo aviso, en caso de que se detecte el incumplimiento de los Términos y Condiciones o por otras razones relacionadas con el uso indebido del servicio.",
    },
    {
      title: "Limitación de Responsabilidad",
      content:
        "La Institución Educativa no será responsable por daños directos, indirectos, incidentales o punitivos derivados del uso del servicio, incluyendo la pérdida de datos o inconvenientes durante el proceso de matrícula.",
    },
    {
      title: "Cambios",
      content:
        "Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. En caso de cambios significativos, notificaremos a los usuarios con al menos 30 días de antelación antes de que los nuevos términos entren en vigencia.",
    },
    {
      title: "Ley Aplicable y Jurisdicción",
      content:
        "Los presentes Términos y Condiciones se rigen por la ley peruana. Cualquier disputa que se produzca con relación a la validez, aplicación o interpretación de los mismos será resuelta en los tribunales del Cercado de Lima.",
    },
    {
      title: "Contacto",
      content:
        "Si tiene alguna pregunta sobre estos Términos y Condiciones o necesita asistencia con el proceso de matrícula, puede ponerse en contacto con nosotros a través de los canales de comunicación disponibles en la plataforma.",
    },
  ],
};

export default function TermsPage() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-archivo-sans)]">
      <div className="flex flex-col gap-16 max-w-3xl">
        <div className="mt-8">
          <div className="mb-16">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft />
                Volver
              </Button>
            </Link>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Términos y Condiciones
              </h1>
              <p className="text-muted-foreground">
                Última actualización: 20/05/2023
              </p>
            </div>
            <div className="space-y-4 pl-5">
              <ol className="list-decimal text-xl font-semibold">
                {data.terms.map((item, index) => (
                  <li key={index}>
                    <h4 className="text-xl font-semibold mt-4">{item.title}</h4>
                    <p className="text-base font-normal mt-4">{item.content}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
