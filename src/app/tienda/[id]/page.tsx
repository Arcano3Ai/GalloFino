import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { businessConfig } from "@/config/business";
import { getMerchWhatsAppUrl } from "@/components/ui/WhatsAppButton";
import { ProductMockup } from "@/components/ui/ProductMockup";

const RAW_GITHUB_BASE = "https://raw.githubusercontent.com/Arcano3Ai/GalloFino/main/public";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = businessConfig.merch.find((m) => m.id === id);

  if (!item) {
    return {
      title: "Producto No Encontrado | Gallo Fino Barber",
    };
  }

  const imageUrl = item.image
    ? `${RAW_GITHUB_BASE}${item.image}`
    : `${RAW_GITHUB_BASE}/assets/logo.jpeg`;

  return {
    title: `${item.id.replace(/-/g, " ").toUpperCase()} (${item.priceMxn}) | Merch Gallo Fino`,
    description: `Producto Oficial Gallo Fino Barber — ${item.priceMxn} (${item.priceUsd}). Pídelo por WhatsApp con envío rápido.`,
    openGraph: {
      title: `${item.id.replace(/-/g, " ").toUpperCase()} — Gallo Fino Barber`,
      description: `Producto Oficial | Precio: ${item.priceMxn} / ${item.priceUsd} | En Stock`,
      url: `https://gallo-fino-barber.vercel.app/tienda/${item.id}`,
      siteName: "Gallo Fino Barber",
      locale: "es_MX",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: item.id,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Merch Oficial Gallo Fino Barber — ${item.priceMxn}`,
      images: [imageUrl],
    },
  };
}

export default async function MerchDetailPage({ params }: Props) {
  const { id } = await params;
  const item = businessConfig.merch.find((m) => m.id === id);

  if (!item) {
    notFound();
  }

  const name = item.id.replace(/-/g, " ").toUpperCase();
  const description = `Producto oficial de la barbería Gallo Fino Barber (${item.category.toUpperCase()}). Edición especial con garantía de calidad norteña.`;

  const waUrl = getMerchWhatsAppUrl(
    item.id,
    name,
    `${item.priceMxn} / ${item.priceUsd}`,
    description,
    item.image!
  );

  return (
    <main className="min-h-screen bg-black text-cream flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-dark border border-gold/40 p-6 sm:p-8 rounded-lg shadow-2xl">
        <div className="relative aspect-square w-full rounded-md overflow-hidden mb-6 border border-gold/20 bg-black flex items-center justify-center">
          <ProductMockup
            id={item.id}
            name={name}
            category={item.category}
            badge={item.badge}
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{item.icon}</span>
          <span className="text-gold font-brand font-black text-2xl">{item.priceMxn} / {item.priceUsd}</span>
        </div>

        <h1 className="font-brand font-black text-3xl text-cream mb-3">
          {name}
        </h1>

        <p className="text-cream-muted text-sm sm:text-base leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 justify-center text-xs py-3.5 text-center font-bold"
          >
            🛒 Pedir este Producto por WhatsApp
          </a>
          <Link
            href="/#tienda"
            className="btn-outline text-xs py-3.5 text-center"
          >
            ← Volver a la Tienda
          </Link>
        </div>
      </div>
    </main>
  );
}
