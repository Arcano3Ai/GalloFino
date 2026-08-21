"use client";

import Image from "next/image";
import { businessConfig } from "@/config/business";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { href: "#inicio", label: t.nav.home },
    { href: "#servicios", label: t.nav.services },
    { href: "#barberos", label: t.nav.barbers },
    { href: "#tienda", label: t.nav.merch },
    { href: "#galeria", label: t.nav.gallery },
    { href: "#citas", label: t.nav.appointments },
    { href: "#ubicacion", label: t.nav.location },
  ];

  return (
    <footer className="bg-black text-cream border-t border-gold/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-gold/40">
                <Image
                  src="/assets/Media2.png"
                  alt="Gallo Fino Barber"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-brand text-gold text-lg font-bold block leading-none">
                  GALLO FINO
                </span>
                <span className="font-brand text-cream-muted text-xs tracking-[0.25em] block">
                  BARBER
                </span>
              </div>
            </div>

            <p className="font-display text-gold italic font-bold text-lg mb-3">
              "{t.hero.slogan}"
            </p>

            <p className="text-cream-muted text-xs leading-relaxed max-w-sm mb-6">
              {t.footer.description}
            </p>

            <WhatsAppButton variant="inline" label="WhatsApp" />
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-brand text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-cream-muted hover:text-cream text-xs tracking-wider uppercase transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Social */}
          <div>
            <h4 className="font-brand text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">
              {t.footer.hours}
            </h4>
            <p className="text-cream-muted text-xs mb-2">
              Lun – Jue: 10:00 – 20:00
            </p>
            <p className="text-cream-muted text-xs mb-2">
              Vie – Sáb: 09:00 – 21:00
            </p>
            <p className="text-cream-muted text-xs mb-6">
              Dom: 10:00 – 15:00
            </p>

            <h4 className="font-brand text-gold text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Social
            </h4>
            <div className="flex flex-wrap gap-4">
              <a
                href={businessConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-muted hover:text-gold text-xs tracking-wider uppercase transition-colors"
              >
                Instagram
              </a>
              <a
                href={businessConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-muted hover:text-gold text-xs tracking-wider uppercase transition-colors"
              >
                Facebook
              </a>
              <a
                href={businessConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-muted hover:text-gold text-xs tracking-wider uppercase transition-colors flex items-center gap-1"
              >
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-cream-muted/60 text-xs">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
