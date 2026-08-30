import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import { businessConfig } from "@/config/business";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  display: "swap",
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700", "900"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://gallo-fino-barber.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: businessConfig.seo.title,
  description: businessConfig.seo.description,
  keywords: businessConfig.seo.keywords,
  authors: [{ name: "Gallo Fino Barber" }],
  openGraph: {
    title: businessConfig.seo.title,
    description: businessConfig.seo.description,
    url: "/",
    siteName: businessConfig.name,
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: businessConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: businessConfig.name,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: businessConfig.seo.title,
    description: businessConfig.seo.description,
    images: [businessConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/Media2.png",
    shortcut: "/assets/Media2.png",
    apple: "/assets/og-image.jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Barber",
  name: businessConfig.name,
  description: businessConfig.description,
  url: "https://gallofino.com",
  telephone: businessConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: businessConfig.address,
    addressLocality: "Monterrey",
    addressRegion: "Nuevo León",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.6866,
    longitude: -100.3743,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "10:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "10:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "10:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "10:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "10:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "15:00" },
  ],
  priceRange: "$$",
  image: "/assets/logo.jpeg",
  sameAs: [
    businessConfig.social.instagram,
    businessConfig.social.facebook,
    businessConfig.social.tiktok,
  ],
};

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-MX"
      className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#0B0B0B" />
        <link rel="icon" href="/assets/Media2.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/og-image.jpg" />
      </head>
      <body className="bg-black text-cream antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
