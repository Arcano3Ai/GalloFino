"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { businessConfig } from "@/config/business";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/context/LanguageContext";

export function Location() {
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

  return (
    <section
      id="ubicacion"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-dark relative overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="section-label mb-4">{t.location.sectionLabel}</p>
          <h2 className="font-brand font-black text-4xl sm:text-5xl text-cream mb-4">
            {t.location.titleMain}<span className="text-gold">{t.location.titleHighlight}</span>
          </h2>
          <div className="ornament-line max-w-xs mx-auto text-gold text-sm">📍</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Info Column */}
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>

            {/* Address */}
            <div className="mb-8">
              <h3 className="section-label mb-3">{t.location.addressLabel}</h3>
              <p className="text-cream text-lg font-semibold">{businessConfig.address}</p>
              <p className="text-cream-muted">{businessConfig.city}</p>
              <a
                href={businessConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs mt-4 inline-flex"
              >
                {t.location.getDirections}
              </a>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h3 className="section-label mb-3">{t.location.contactLabel}</h3>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${businessConfig.phone.replace(/\s/g, "")}`}
                  className="text-cream hover:text-gold transition-colors"
                >
                  📞 {businessConfig.phone}
                </a>
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="text-cream hover:text-gold transition-colors"
                >
                  ✉ {businessConfig.email}
                </a>
              </div>
              <div className="mt-3">
                <WhatsAppButton
                  variant="full"
                  label={t.location.waBtn}
                  className="text-xs py-2.5"
                />
              </div>
            </div>

            {/* Hours Table */}
            <div>
              <h3 className="section-label mb-4">{t.location.hoursLabel}</h3>
              <div className="border border-gold/10 overflow-hidden">
                {Object.entries(businessConfig.hours).map(([day, hours], index) => {
                  const dayKey = day as keyof typeof t.location.days;
                  const isToday = new Date().getDay() === ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"].indexOf(day);
                  return (
                    <div
                      key={day}
                      className={`
                        flex justify-between items-center px-4 py-3 text-sm
                        ${index % 2 === 0 ? "bg-black/30" : "bg-transparent"}
                        ${isToday ? "border-l-2 border-gold" : ""}
                      `}
                    >
                      <span className={`font-semibold ${isToday ? "text-gold" : "text-cream"}`}>
                        {t.location.days[dayKey]}
                        {isToday && <span className="ml-2 text-[10px] bg-gold text-black px-1.5 py-0.5 font-bold">{t.location.todayBadge}</span>}
                      </span>
                      {hours ? (
                        <span className="text-cream-muted">
                          {hours.open} — {hours.close}
                        </span>
                      ) : (
                        <span className="text-wine text-xs font-semibold">{t.location.closedText}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="relative">
              <div className="relative aspect-[4/3] border border-gold/20 overflow-hidden">
                <iframe
                  src={businessConfig.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gallo Fino Barber Location"
                />
              </div>

              {/* Map overlay badge with real photo thumbnail */}
              <div className="absolute -bottom-4 -right-4 bg-dark border border-gold/40 p-3 flex items-center gap-3 shadow-2xl backdrop-blur-md">
                <div className="relative w-12 h-12 overflow-hidden border border-gold/50">
                  <Image
                    src="/assets/barbershop-interior-real.jpg"
                    alt="Gallo Fino Barber Shop"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-cream text-xs font-brand font-bold tracking-wider">GALLO FINO</div>
                  <div className="text-gold text-[10px] font-semibold">Monterrey, NL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
