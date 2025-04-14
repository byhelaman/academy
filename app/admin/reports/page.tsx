import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReportsPage() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-dashed border-b">
        <CardTitle>Reportes y Estadísticas</CardTitle>
        <CardDescription>
          Visualice reportes y estadísticas del sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="enrollments" className="w-full gap-8">
          <TabsList>
            <TabsTrigger value="enrollments" className="px-4">
              Matrículas
            </TabsTrigger>
            <TabsTrigger value="docs" className="px-4">
              Documentos
            </TabsTrigger>
            <TabsTrigger value="sections" className="px-4">
              Secciones
            </TabsTrigger>
          </TabsList>
          <TabsContent value="enrollments">
            @TODO: Enrollments report
          </TabsContent>
          <TabsContent value="docs">@TODO: Documents report</TabsContent>
          <TabsContent value="sections">@TODO: Sections report</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
