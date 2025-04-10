"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BarChart,
  Bell,
  ChevronLeft,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Upload,
  User,
  Users,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EnrollmentForm } from "./components/form";
import { Badge } from "@/components/ui/badge";

const data = {
  navMain: [
    { title: "Dashboard", value: "dashboard", icon: LayoutDashboard },
    { title: "Matrícula", value: "enrollment", icon: GraduationCap },
    { title: "Estudiantes", value: "students", icon: Users },
    { title: "Documentos", value: "documents", icon: Upload },
    { title: "Notificaciones", value: "notifications", icon: Bell, badge: 5 },
    { title: "Perfil", value: "profile", icon: User },
    { title: "Configuración", value: "settings", icon: Settings },
  ],
};

export default function AdminPage() {
  return (
    <div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10 font-[family-name:var(--font-archivo-sans)]">
      <div className="flex flex-col w-full max-w-6xl">
        <div className="my-8">
          <Link href="/logout" className="pl-[3px]">
            <Button variant="ghost" size="sm">
              <ChevronLeft />
              Volver
            </Button>
          </Link>
        </div>
        <Tabs
          defaultValue="enrollment"
          className="w-full flex-col md:flex-row gap-3"
        >
          {/* Navigation */}
          <ScrollArea>
            <nav className="bg-background">
              <TabsList className="w-full md:w-[200px] h-auto flex flex-row md:flex-col items-stretch bg-transparent md:space-y-1">
                {data.navMain.map((item) => (
                  <TabsTrigger
                    key={item.title}
                    value={item.value}
                    className="group justify-start py-[5px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                    asChild
                  >
                    <Button variant="ghost" size="sm">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                      {item.badge && (
                        <Badge className="group-data-[state=active]:bg-background group-data-[state=active]:text-primary">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </TabsTrigger>
                ))}
              </TabsList>
            </nav>
            <ScrollBar orientation="horizontal" className="h-1.5" />
          </ScrollArea>

          {/* Content */}
          <div className="w-full">
            <TabsContent value="dashboard" className="mt-0">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Panel de Administración</CardTitle>
                  <CardDescription>
                    Aquí está el resumen de su proceso de matrícula
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">Gráfico de barras</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="students" className="mt-0">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Gestión de Estudiantes</CardTitle>
                  <CardDescription>
                    Administra la información de los estudiantes registrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">
                      Tabla de estudiantes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="enrollment" className="mt-0">
              <Enrollment />
            </TabsContent>

            <TabsContent value="documents" className="mt-0">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Documentación</CardTitle>
                  <CardDescription>
                    Gestiona los documentos requeridos para el proceso de
                    matrícula
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">Lista de documentos</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <Profile />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Configuración del Sistema</CardTitle>
                  <CardDescription>
                    Administra las configuraciones generales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">
                      Opciones de configuración
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

function Enrollment() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-dashed border-b">
        <CardTitle>Proceso de Matrícula</CardTitle>
        <CardDescription>
          Gestiona el proceso de matrícula actual
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EnrollmentForm />
      </CardContent>
    </Card>
  );
}

function Profile() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-dashed border-b">
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>
          Gestione su información personal y de contacto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
          <p className="text-muted-foreground">Mi Perfil</p>
        </div>
      </CardContent>
    </Card>
  );
}
