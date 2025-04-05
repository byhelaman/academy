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
            <a href="#" className="underline">
              Términos de servicio
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              Política de privacidad
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
