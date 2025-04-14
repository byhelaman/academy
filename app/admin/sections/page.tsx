import { RegisterForm } from "@/app/register/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlay, CirclePlus, Grid2X2Plus, Plus } from "lucide-react";

export default function SectionsPage() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-dashed border-b">
        <div className="flex justify-between items-center gap-6">
          <div className="flex flex-col gap-1.5">
            <CardTitle>Gestión de Secciones</CardTitle>
            <CardDescription>
              Administre las secciones y asigne estudiantes
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button type="button" className="!pr-4">
                <Plus className="h-4 w-4" />
                Crear
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nueva Sección</DialogTitle>
                <DialogDescription>
                  Complete los datos para crear una nueva sección
                </DialogDescription>
              </DialogHeader>
              {/* content */}
              @TODO: Crear Formulario
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button">Confirmar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* <Button type="button" className="absolute right-6">
          Crear
        </Button> */}
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
          <p className="text-muted-foreground">Tabla de secciones</p>
        </div>
      </CardContent>
    </Card>
  );
}
