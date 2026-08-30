import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { businessConfig } from "@/config/business";
import { getServiceWhatsAppUrl } from "@/components/ui/WhatsAppButton";

const RAW_GITHUB_BASE = "https://raw.githubusercontent.com/Arcano3Ai/GalloFino/main/public";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = businessConfig.services.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Servicio No Encontrado | Gallo Fino Barber",
    };
  }

  const imageUrl = service.image
    ? `${RAW_GITHUB_BASE}${service.image}`
    : `${RAW_GITHUB_BASE}/assets/logo.jpeg`;

  return {
    title: `${service.name} (${service.price}) | Gallo Fino Barber`,
    description: `${service.description} — ${service.price} (${service.duration}). Agenda tu cita en Gallo Fino Barber.`,
    openGraph: {
      title: `${service.name} — Gallo Fino Barber`,
      description: `${service.description} | Precio: ${service.price} | Duración: ${service.duration}`,
      url: `https://gallo-fino-barber.vercel.app/servicios/${service.id}`,
      siteName: "Gallo Fino Barber",
      locale: "es_MX",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: service.name,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} (${service.price}) | Gallo Fino Barber`,
      description: service.description,
      images: [imageUrl],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = businessConfig.services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const waUrl = getServiceWhatsAppUrl(
    service.id,
    service.name,
    service.price,
    service.duration,
    service.description,
    service.image!
  );

  return (
    <main className="min-h-screen bg-black text-cream flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-dark border border-gold/40 p-6 sm:p-8 rounded-lg shadow-2xl">
        <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden mb-6 border border-gold/20">
          <Image
            src={service.image!}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{service.icon}</span>
          <span className="text-gold font-brand font-black text-2xl">{service.price}</span>
          <span className="text-cream-muted text-xs">({service.duration})</span>
        </div>

        <h1 className="font-brand font-black text-3xl text-cream mb-3">
          {service.name}
        </h1>

        <p className="text-cream-muted text-sm sm:text-base leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 justify-center text-xs py-3.5 text-center font-bold"
          >
            💬 Agendar este Servicio por WhatsApp
          </a>
          <Link
            href="/#servicios"
            className="btn-outline text-xs py-3.5 text-center"
          >
            ← Volver a la Barbería
          </Link>
        </div>
      </div>
    </main>
  );
}
