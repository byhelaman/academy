"use client";

import { Button } from "@/components/ui/button";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 font-[family-name:var(--font-archivo-sans)]">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft />
              Volver
            </Button>
          </Link>
        </div>
        <div>
          <LoginForm />
          <div className="pt-4 text-balance text-center text-xs text-muted-foreground">
            <Link href="/terms" className="underline">
              Términos y Condiciones
            </Link>
            <span className="mx-1 inline-block">|</span>
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
