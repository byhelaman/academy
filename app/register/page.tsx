"use client";

import { Button } from "@/components/ui/button";

import { ArrowUpRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { RegisterForm } from "./form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 font-[family-name:var(--font-archivo-sans)]">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft />
              Volver
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Ya tienes una cuenta?
              <ArrowUpRight />
            </Button>
          </Link>
        </div>
        <div>
          <RegisterForm />
          <div className="pt-4 text-balance text-center text-xs text-muted-foreground">
            Al crear una cuenta, usted acepta nuestros{" "}
            <Link href="/terms" className="underline">
              Términos y Condiciones
            </Link>{" "}
            y{" "}
            <Link href="/privacy" className="underline">
              Política de Privacidad
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
