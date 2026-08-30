"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { businessConfig } from "@/config/business";
import { getWhatsAppUrl, getServiceWhatsAppUrl } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/context/LanguageContext";

export function Services() {
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
      id="servicios"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-black relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="section-label mb-4">{t.services.sectionLabel}</p>
          <h2 className="font-brand font-black text-4xl sm:text-5xl text-cream mb-4">
            {t.services.titleMain} <span className="text-gold">{t.services.titleHighlight}</span>
          </h2>
          <div className="ornament-line max-w-xs mx-auto text-gold text-sm">🐓</div>
          <p className="text-cream-muted text-base mt-4 max-w-lg mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Featured service (Gallo de Oro) */}
        {(() => {
          const featured = businessConfig.services.find(s => s.id === "gallo-de-oro")!;
          const itemT = t.services.items["gallo-de-oro"];
          const waUrl = getServiceWhatsAppUrl(
            featured.id,
            itemT.name,
            itemT.price,
            featured.duration,
            itemT.description,
            featured.image!
          );
          return (
            <div
              className={`relative overflow-hidden mb-6 border border-gold/30 group transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="relative h-72 sm:h-80">
                <Image
                  src={featured.image!}
                  alt={itemT.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 max-w-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{featured.icon}</span>
                  <span className="text-[10px] bg-gold text-black px-3 py-1 font-black tracking-widest uppercase">
                    {t.services.featuredBadge}
                  </span>
                </div>
                <h3 className="font-brand text-3xl sm:text-4xl text-cream font-black mb-2 tracking-wider">
                  {itemT.name}
                </h3>
                <p className="text-cream-muted text-sm sm:text-base leading-relaxed mb-6">
                  {itemT.description}
                </p>
                <div className="flex items-center gap-6 mb-6">
                  <span className="text-gold text-3xl font-brand font-black">{itemT.price}</span>
                  <span className="text-cream-muted text-sm">{t.services.durationPrefix}{featured.duration}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={scrollToAppointments} className="btn-primary text-xs py-3 px-6">
                    {t.services.bookNow}
                  </button>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-whatsapp text-xs py-3 px-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Other 4 services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessConfig.services
            .filter(s => s.id !== "gallo-de-oro")
            .map((service, index) => {
              const itemT = t.services.items[service.id as keyof typeof t.services.items];
              const waUrl = getServiceWhatsAppUrl(
                service.id,
                itemT.name,
                itemT.price,
                service.duration,
                itemT.description,
                service.image!
              );
              return (
                <div
                  key={service.id}
                  className={`
                    relative overflow-hidden group cursor-pointer border border-white/5
                    hover:border-gold/40 transition-all duration-500
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                    ${service.popular ? "ring-1 ring-gold/30" : ""}
                  `}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={service.image!}
                      alt={itemT.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {service.popular && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gold text-black text-[9px] font-black px-2 py-0.5 tracking-widest uppercase">
                          {t.services.popularBadge}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-5xl">{service.icon}</div>
                    </div>
                  </div>

                  <div className="bg-dark p-5">
                    <h3 className="font-brand text-cream text-base font-bold tracking-wider mb-1">
                      {itemT.name}
                    </h3>
                    <p className="text-cream-muted text-xs leading-relaxed mb-4 line-clamp-2">
                      {itemT.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gold font-brand font-bold text-xl">{itemT.price}</span>
                      <span className="text-cream-muted text-[10px] tracking-wider">{t.services.durationPrefix}{service.duration}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={scrollToAppointments}
                        className="flex-1 btn-primary text-[10px] py-2 px-3 justify-center"
                      >
                        {t.services.bookBtn}
                      </button>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors flex-shrink-0"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-10 transition-all duration-700 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <a
            href={getWhatsAppUrl("Hola, Gallo Fino Barber. Tengo una consulta sobre sus servicios.", businessConfig.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs inline-flex"
          >
            {t.services.faqBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
