"use client";

import { Button } from "@/components/ui/button";
import {
  Activity,
  Bell,
  ChevronLeft,
  FileText,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LibraryBig,
  Settings,
  Shapes,
  Upload,
  User,
  Users,
} from "lucide-react";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  {
    title: "Notificaciones",
    path: "/admin/notifications",
    icon: Bell,
    badge: 5,
  },
  { title: "Estudiantes", path: "/admin/students", icon: Users },
  { title: "Secciones ", path: "/admin/sections", icon: Shapes },
  { title: "Documentos", path: "/admin/documents", icon: FileText },
  { title: "Reportes", path: "/admin/reports", icon: LibraryBig },
  {
    title: "Configuración",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10 font-[family-name:var(--font-archivo-sans)]">
      <div className="flex flex-col w-full max-w-6xl">
        <div className="my-8">
          <Link href="/login" className="pl-[3px]">
            <Button variant="ghost" size="sm">
              <ChevronLeft />
              Volver
            </Button>
          </Link>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-3">
          {/* Navigation */}
          <ScrollArea>
            <nav className="bg-background">
              <div className="w-full md:w-[200px] h-auto flex flex-row md:flex-col items-stretch bg-transparent md:space-y-1 p-[3px]">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link key={item.title} href={item.path} className="w-full">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start py-2 ${
                          isActive
                            ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                            : ""
                        } group`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <Badge
                            className={`ml-auto ${
                              isActive
                                ? "bg-background text-primary group-hover:bg-background group-hover:text-primary"
                                : ""
                            } `}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </nav>
            <ScrollBar orientation="horizontal" className="h-1.5" />
          </ScrollArea>

          {/* Content */}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
