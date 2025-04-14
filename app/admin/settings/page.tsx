import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-dashed border-b">
        <CardTitle>Configuración</CardTitle>
        <CardDescription>
          Administre la configuración del sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full gap-8">
          <TabsList>
            <TabsTrigger value="general" className="px-4">
              General
            </TabsTrigger>
            <TabsTrigger value="enrollment" className="px-4">
              Matrícula
            </TabsTrigger>
            <TabsTrigger value="users" className="px-4">
              Usuarios
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">@TODO: General settings</TabsContent>
          <TabsContent value="enrollment">
            @TODO: Enrollment settings
          </TabsContent>
          <TabsContent value="users">@TODO: Users settings</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
