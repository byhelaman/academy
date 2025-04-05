import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const data = {
  privacy: [
    {
      title: "Introducción",
      content:
        "Bienvenido a la sección de privacidad de nuestra Institución Educativa. Esta política de privacidad regula el uso de nuestra plataforma en línea y cómo manejamos la información personal que recopilamos. Al utilizar nuestros servicios, usted acepta nuestras prácticas de privacidad descritas aquí, en cumplimiento con la Ley N° 29733, Ley de Protección de Datos Personales.",
    },
    {
      title: "Información que Recopilamos",
      content:
        "Recopilamos información personal, como nombres, direcciones de correo electrónico y otros datos necesarios para la matrícula y el uso del servicio. Esta información es esencial para garantizar el correcto funcionamiento de la plataforma y el cumplimiento de nuestras obligaciones legales.",
    },
    {
      title: "Uso de la Información",
      content:
        "La información recopilada se utiliza exclusivamente para procesar su matrícula, mejorar nuestros servicios y comunicarnos con usted sobre actualizaciones importantes relacionadas con la plataforma. No compartimos su información personal con terceros, excepto cuando sea necesario para cumplir con las leyes o para proporcionar los servicios solicitados.",
    },
    {
      title: "Protección de la Información",
      content:
        "Tomamos medidas razonables para proteger la información personal de los usuarios. Sin embargo, no podemos garantizar la seguridad absoluta de la información transmitida a través de internet. Al utilizar nuestros servicios, usted reconoce y acepta los riesgos asociados con la transmisión de datos en línea.",
    },
    {
      title: "Derechos del Usuario",
      content:
        "Usted tiene derecho a acceder, corregir, actualizar o eliminar su información personal en cualquier momento. Si desea ejercer estos derechos, puede contactarnos a través de los canales establecidos en la plataforma. Responderemos a su solicitud en los plazos establecidos por la ley.",
    },
    {
      title: "Cambios en la Política de Privacidad",
      content:
        "Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Le notificaremos sobre cualquier cambio importante con antelación suficiente antes de que entre en vigencia. Le recomendamos revisar periódicamente esta sección para estar informado sobre cómo protegemos su información.",
    },
    {
      title: "Contacto",
      content:
        "Si tiene alguna pregunta sobre nuestra política de privacidad o cómo manejamos su información, no dude en ponerse en contacto con nosotros a través de los canales de comunicación disponibles en la plataforma.",
    },
  ],
};

export default function PrivacyPage() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-archivo-sans)]">
      <div className="flex flex-col gap-16 max-w-[648px]">
        <div className="mt-8">
          <div className="mb-16">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft />
                Volver
              </Button>
            </Link>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Política de Privacidad
              </h1>
              <p className="text-muted-foreground">
                Última actualización: 20/05/2023
              </p>
            </div>
            <div className="space-y-4 pl-5">
              <ol className="list-decimal text-xl font-semibold">
                {data.privacy.map((item, index) => (
                  <li key={index}>
                    <h4 className="text-xl font-semibold mt-4">{item.title}</h4>
                    <p className="text-base font-normal mt-4">{item.content}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
