import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HelpPage() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-dashed border-b">
        <CardTitle>Centro de Ayuda</CardTitle>
        <CardDescription>Resuelva sus dudas fácilmente</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="faq" className="w-full gap-8">
          <ScrollArea>
            <TabsList>
              <TabsTrigger value="faq" className="px-4">
                Preguntas Frecuentes
              </TabsTrigger>
              <TabsTrigger value="docs" className="px-4">
                Documentos
              </TabsTrigger>
              <TabsTrigger value="guides" className="px-4">
                Guías de Uso
              </TabsTrigger>
              <TabsTrigger value="contact" className="px-4">
                Contacto
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" className="h-1.5" />
          </ScrollArea>
          <TabsContent value="faq">@TODO: FAQ</TabsContent>
          <TabsContent value="docs">@TODO: Documentos</TabsContent>
          <TabsContent value="guides">@TODO: Guías de Uso</TabsContent>
          <TabsContent value="contact">
            @TODO: Información de Contacto
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
