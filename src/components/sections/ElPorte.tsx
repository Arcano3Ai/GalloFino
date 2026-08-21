"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { businessConfig } from "@/config/business";
import { getWhatsAppUrl } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/context/LanguageContext";

export function ElPorte() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { founder } = businessConfig;
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToAppointments = () => {
    document.getElementById("citas")?.scrollIntoView({ behavior: "smooth" });
  };

  const waUrl = getWhatsAppUrl(
    `Hola Jaime, estuve leyendo la historia de Gallo Fino y me gustaría agendar un servicio contigo.`,
    businessConfig.whatsapp
  );

  return (
    <section
      id="el-porte"
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden bg-dark border-y border-gold/10"
    >
      {/* Ambient background glows */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 75% 30%, #B89245 0%, transparent 65%),
                            radial-gradient(circle at 25% 80%, #681B1B 0%, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #B89245, #B89245 1px, transparent 1px, transparent 50px)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Column 1: Image & Founder Card */}
          <div
            className={`
              lg:col-span-5 relative transition-all duration-1000
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
            `}
          >
            {/* Main Portrait frame */}
            <div className="relative aspect-[3/4] overflow-hidden border-2 border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                priority
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Founder Tag overlay */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-gold/40 px-3 py-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[11px] font-mono text-gold tracking-widest uppercase">
                  {t.elPorte.founderBadge}
                </span>
              </div>
            </div>

            {/* Floating Badge (Jaime Quote snippet) */}
            <div className="absolute -bottom-8 -right-4 sm:right-4 bg-dark/95 backdrop-blur-md border border-gold/40 p-5 max-w-[260px] shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full border border-gold/40 overflow-hidden relative flex-shrink-0">
                  <Image src={founder.image} alt="Jaime" fill className="object-cover object-top" />
                </div>
                <div>
                  <div className="text-cream text-xs font-brand font-bold">{founder.name}</div>
                  <div className="text-gold text-[10px] uppercase tracking-wider">{t.elPorte.experienceLabel}</div>
                </div>
              </div>
              <p className="text-cream-muted text-[11px] italic leading-snug">
                "{t.elPorte.quote}"
              </p>
            </div>

            {/* Gold Frame Accent */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
          </div>

          {/* Column 2: Storytelling */}
          <div
            className={`
              lg:col-span-7 transition-all duration-1000 delay-200
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}
            `}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="section-label">{t.elPorte.sectionLabel}</span>
              <span className="h-px w-12 bg-gold/40" />
            </div>

            <h2 className="font-brand font-black text-4xl sm:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6">
              {t.elPorte.titleMain} <br />
              <span className="text-gold">{t.elPorte.titleHighlight}</span>
            </h2>

            <p className="text-cream/90 text-lg sm:text-xl font-display italic font-semibold leading-relaxed mb-6 border-l-2 border-gold pl-5 py-1">
              "{t.elPorte.tagline}"
            </p>

            <p className="text-cream-muted text-base leading-relaxed mb-6">
              {t.elPorte.story}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-10 border-y border-gold/15 py-6">
              <div>
                <div className="font-brand text-gold text-3xl sm:text-4xl font-black">{t.elPorte.stat1Value}</div>
                <div className="text-cream-muted text-[10px] sm:text-xs tracking-widest uppercase mt-1">{t.elPorte.stat1Label}</div>
              </div>
              <div>
                <div className="font-brand text-gold text-3xl sm:text-4xl font-black">{t.elPorte.stat2Value}</div>
                <div className="text-cream-muted text-[10px] sm:text-xs tracking-widest uppercase mt-1">{t.elPorte.stat2Label}</div>
              </div>
              <div>
                <div className="font-brand text-gold text-3xl sm:text-4xl font-black">{t.elPorte.stat3Value}</div>
                <div className="text-cream-muted text-[10px] sm:text-xs tracking-widest uppercase mt-1">{t.elPorte.stat3Label}</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToAppointments}
                className="btn-primary text-xs py-3.5 px-8"
              >
                {t.elPorte.ctaTeam}
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs py-3.5 px-6 inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.elPorte.ctaWaJaime}
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
