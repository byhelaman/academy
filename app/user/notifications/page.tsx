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
        <CardTitle>Centro de Notificaciones</CardTitle>
        <CardDescription>
          Gestiona el proceso de matrícula actual
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
          <p className="text-muted-foreground">Notificaciones recientes</p>
        </div>
      </CardContent>
    </Card>
  );
}
