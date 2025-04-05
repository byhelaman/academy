import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Contact() {
  return (
    <Dialog>
      <DialogTrigger
        className="font-[family-name:var(--font-archivo-sans)]"
        asChild
      >
        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          Contacto
        </Button>
      </DialogTrigger>
      <DialogContent className="font-[family-name:var(--font-archivo-sans)]">
        <DialogHeader>
          <DialogTitle>¿Necesita ayuda?</DialogTitle>
          <DialogDescription>
            Póngase en contacto con nosotros si necesita ayuda adicional
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col pt-2">
            <header className="flex flex-col mb-2">
              <h4 className="font-semibold text-base">Administración</h4>
              <p className="text-muted-foreground">
                Para consultas sobre el proceso de matrícula
              </p>
            </header>
            <address className="not-italic flex flex-col">
              <span>soporte@academy.edu.pe</span>
              <span>(+51) 123 456 789</span>
              <time dateTime="Mo-Fr 08:00-17:00">
                Lunes a Viernes, 8:00 AM - 5:00 PM
              </time>
            </address>
          </div>

          <div className="flex flex-col border-t border-dashed pt-4">
            <header className="flex flex-col mb-2">
              <h4 className="font-semibold text-base">Soporte Técnico</h4>
              <p className="text-muted-foreground">
                Para problemas técnicos con la plataforma
              </p>
            </header>
            <address className="not-italic flex flex-col">
              <span>admin@academy.edu.pe</span>
              <span>(+51) 312 456 423</span>
              <time dateTime="Mo-Fr 08:00-17:00">
                Lunes a Viernes, 8:00 AM - 5:00 PM
              </time>
            </address>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
