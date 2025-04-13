import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DocumentsPage() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-dashed border-b">
        <CardTitle>Documentación</CardTitle>
        <CardDescription>
          Gestiona los documentos requeridos para el proceso de matrícula
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
          <p className="text-muted-foreground">Lista de documentos</p>
        </div>
      </CardContent>
    </Card>
  );
}
