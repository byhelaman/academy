import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnrollmentForm } from "./forms/enrollment";
import Link from "next/link";

export default function EnrollmentPage() {
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
