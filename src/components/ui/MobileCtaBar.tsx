"use client";

import { getWhatsAppUrl } from "@/components/ui/WhatsAppButton";
import { businessConfig } from "@/config/business";
import { useLanguage } from "@/context/LanguageContext";

export function MobileCtaBar() {
  const { t } = useLanguage();
  const waUrl = getWhatsAppUrl(
    "Hola, Gallo Fino Barber. Quiero agendar una cita. ¿Qué horarios tienen disponibles?",
    businessConfig.whatsapp
  );

  const scrollToAppointments = () => {
    document.getElementById("citas")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mobile-cta-bar pb-safe">
      <button
        onClick={scrollToAppointments}
        className="btn-primary flex-1 justify-center text-xs py-3"
      >
        {t.mobileCta.book}
      </button>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp flex-1 justify-center text-xs py-3 text-center"
      >
        {t.mobileCta.wa}
      </a>
    </div>
  );
}
