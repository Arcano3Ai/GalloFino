"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { businessConfig } from "@/config/business";
import { getWhatsAppUrl } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/context/LanguageContext";

export function Barbers() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToAppointments = () => {
    document.getElementById("citas")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="barberos"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-darkgray relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 40%, #B89245 0%, transparent 60%),
                            radial-gradient(circle at 80% 60%, #681B1B 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="section-label mb-4">{t.barbers.sectionLabel}</p>
          <h2 className="font-brand font-black text-4xl sm:text-5xl text-cream mb-4">
            {t.barbers.titleMain} <span className="text-gold">{t.barbers.titleHighlight}</span>
          </h2>
          <div className="ornament-line max-w-xs mx-auto text-gold text-sm">✂</div>
          <p className="text-cream-muted text-base mt-4 max-w-md mx-auto">
            {t.barbers.subtitle}
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessConfig.barbers.map((barber, index) => {
            const barberT = t.barbers.items[barber.id as keyof typeof t.barbers.items];
            const waMsg = `Hola, Gallo Fino Barber. Quiero agendar una cita con ${barberT.name}.`;
            const waUrl = getWhatsAppUrl(waMsg, businessConfig.whatsapp);

            return (
              <div
                key={barber.id}
                className={`
                  group relative overflow-hidden bg-dark border border-gold/20
                  transition-all duration-500 hover:border-gold/60 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(184,146,69,0.15)]
                  flex flex-col justify-between
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <Image
                    src={barber.image}
                    alt={barberT.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-black/30" />

                  <div className="absolute top-3 right-4 font-brand text-5xl font-black text-gold/20 select-none drop-shadow">
                    #{barber.number}
                  </div>

                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-gold/30 px-3 py-1 text-[11px] text-gold font-mono tracking-wider">
                    {barber.instagram}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between border-t border-gold/10">
                  <div>
                    <div className="mb-2">
                      <span className="inline-block bg-wine/40 border border-wine-light/50 text-cream text-[10px] font-bold px-2.5 py-0.5 tracking-widest uppercase">
                        {barberT.specialty}
                      </span>
                    </div>

                    <h3 className="font-brand text-cream text-2xl font-black tracking-wider mb-3">
                      {barberT.name}
                    </h3>

                    <p className="text-cream-muted text-xs leading-relaxed mb-6">
                      {barberT.bio}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-white/5">
                    <button
                      onClick={scrollToAppointments}
                      className="flex-1 btn-primary text-xs py-3 justify-center"
                    >
                      {t.barbers.bookWithHim}
                    </button>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors flex-shrink-0"
                      aria-label={`WhatsApp ${barberT.name}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
