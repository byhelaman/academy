import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ArrowUpRight,
  FileUp,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";
// import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Faq from "./components/faq";
import Contact from "./components/contact";
import { Badge } from "@/components/ui/badge";

const data = {
  process: [
    {
      title: "Registro",
      description: "Cree una cuenta con sus datos personales.",
      icon: UserRoundPlus,
    },
    {
      title: "Documentación",
      description: "Suba los documentos y verifique su aprobación. ",
      icon: FileUp,
    },
    {
      title: "Confirmación",
      description: "Reciba la confirmación y asignación de sección ",
      icon: ShieldCheck,
    },
  ],
};

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-archivo-sans)]">
      <div className="flex flex-col gap-8 items-center max-w-[648px]">
        <div className="flex flex-col gap-6 py-8 w-full">
          <div className="flex gap-2 justify-center w-full py-8">
            <Badge variant="secondary">v0.1 beta</Badge>
          </div>
          <div className="max-w-3xl text-center space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">
              Matrícula rápida, fácil y segura!
            </h1>
            <p className="text-lg text-muted-foreground">
              Inscribe a tus hijos en minutos, sin complicaciones.
            </p>
          </div>
          <div className="flex gap-4 items-center sm:flex-row m-auto">
            <Link href="/register">
              <Button>Comienza ahora</Button>
            </Link>
            <Link href="#faq">
              <Button variant="link" className="underline">
                Descubre cómo funciona
                <ArrowUpRight />
              </Button>
            </Link>
          </div>
        </div>
        <div className="space-y-6 w-full py-8 ">
          <div className="max-w-3xl text-center">
            <h2 className="text-xl font-semibold tracking-tight">
              Proceso de Matrícula
            </h2>
            <p className="text-muted-foreground text-sm">
              Tres simples pasos para completar tu matrícula
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {data.process.map((item, index) => (
              <Card key={index} className="shadow-none w-full">
                <CardHeader>
                  <CardTitle>{item.icon && <item.icon />}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold">
                    {index + 1}. {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Faq />
      </div>
      <footer className="w-full flex flex-wrap items-center justify-center sm:justify-between text-sm max-w-[648px]">
        <span className="text-muted-foreground">
          © 2025 Academy. Todos los derechos reservados.
        </span>
        <div className="flex">
          <Link href="/terms">
            <Button
              variant="link"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Términos
            </Button>
          </Link>
          <Link href="/privacy">
            <Button
              variant="link"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Privacidad
            </Button>
          </Link>
          <Contact />
        </div>
      </footer>
    </div>
  );
}
