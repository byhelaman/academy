import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProfileForm, SecurityForm } from "./form/profile";

export default function ProfilePage() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-dashed border-b">
        <CardTitle>Mi Perfil</CardTitle>
        <CardDescription>
          Gestione su información personal y de contacto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full gap-8">
          <TabsList>
            <TabsTrigger value="profile" className="px-4">
              Personal
            </TabsTrigger>
            <TabsTrigger value="security" className="px-4">
              Seguridad
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="security">
            <SecurityForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
